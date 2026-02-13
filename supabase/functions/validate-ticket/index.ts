import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // This function uses the service role key (staff scanning QR codes)
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const { qr_code } = await req.json()

    if (!qr_code) {
      return new Response(JSON.stringify({ error: 'qr_code is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Find ticket by QR code, join with event and tier info
    const { data: ticket, error: ticketError } = await supabaseAdmin
      .from('tickets')
      .select(`
        id,
        status,
        user_id,
        event_id,
        tier_id,
        qr_code,
        events!inner ( id, title, date ),
        ticket_tiers!inner ( id, name ),
        profiles!inner ( id, display_name, avatar_url )
      `)
      .eq('qr_code', qr_code)
      .single()

    if (ticketError || !ticket) {
      return new Response(JSON.stringify({ error: 'Ticket not found', valid: false }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Verify status is active
    if (ticket.status !== 'active') {
      return new Response(JSON.stringify({
        error: `Ticket already ${ticket.status}`,
        valid: false,
        status: ticket.status,
      }), {
        status: 409,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Verify event date is today (within a 24-hour window)
    const event = ticket.events as unknown as { id: string; title: string; date: string }
    const eventDate = new Date(event.date)
    const now = new Date()
    const diffHours = Math.abs(now.getTime() - eventDate.getTime()) / (1000 * 60 * 60)

    if (diffHours > 24) {
      return new Response(JSON.stringify({
        error: 'Ticket is not valid for today',
        valid: false,
        event_date: event.date,
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Mark ticket as used
    const { error: updateError } = await supabaseAdmin
      .from('tickets')
      .update({ status: 'used' })
      .eq('id', ticket.id)

    if (updateError) {
      return new Response(JSON.stringify({ error: 'Failed to validate ticket' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const tier = ticket.ticket_tiers as unknown as { id: string; name: string }
    const profile = ticket.profiles as unknown as { id: string; display_name: string; avatar_url: string }

    return new Response(JSON.stringify({
      valid: true,
      holder: {
        name: profile.display_name,
        avatar_url: profile.avatar_url,
      },
      tier: tier.name,
      event: event.title,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
