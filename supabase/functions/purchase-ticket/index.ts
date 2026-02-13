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
    const authHeader = req.headers.get('Authorization')!
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    )

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const { event_id, tier_id, pay_with_wallet } = await req.json()

    if (!event_id || !tier_id) {
      return new Response(JSON.stringify({ error: 'event_id and tier_id are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Verify tier exists and has capacity
    const { data: tier, error: tierError } = await supabaseAdmin
      .from('ticket_tiers')
      .select('*')
      .eq('id', tier_id)
      .eq('event_id', event_id)
      .single()

    if (tierError || !tier) {
      return new Response(JSON.stringify({ error: 'Ticket tier not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (tier.sold_count >= tier.capacity) {
      return new Response(JSON.stringify({ error: 'This tier is sold out' }), {
        status: 409,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // If paying with wallet, debit the amount
    if (pay_with_wallet) {
      const { error: debitError } = await supabaseAdmin.rpc('debit_wallet', {
        p_user_id: user.id,
        p_amount: tier.price,
        p_type: 'ticket_purchase',
        p_description: `Ticket: ${tier.name}`,
        p_metadata: { event_id, tier_id },
      })

      if (debitError) {
        return new Response(JSON.stringify({ error: debitError.message }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
    }

    // Generate unique QR code
    const qrCode = crypto.randomUUID()

    // Create the ticket
    const { data: ticket, error: ticketError } = await supabaseAdmin
      .from('tickets')
      .insert({
        user_id: user.id,
        event_id,
        tier_id,
        qr_code: qrCode,
        status: 'active',
      })
      .select()
      .single()

    if (ticketError) {
      return new Response(JSON.stringify({ error: ticketError.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Increment sold_count on the tier
    const { error: updateError } = await supabaseAdmin
      .from('ticket_tiers')
      .update({ sold_count: tier.sold_count + 1 })
      .eq('id', tier_id)

    if (updateError) {
      console.error('Failed to increment sold_count:', updateError)
    }

    // Create notification
    await supabaseAdmin.from('notifications').insert({
      user_id: user.id,
      title: 'Ticket purchased!',
      message: `Your ${tier.name} ticket has been confirmed. Show the QR code at the door.`,
      icon: 'confirmation_number',
      icon_color: 'text-primary',
      href: '/tickets',
    })

    return new Response(JSON.stringify({ success: true, ticket }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
