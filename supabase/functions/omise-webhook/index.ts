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
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const payload = await req.json()
    const eventType = payload.key
    const chargeData = payload.data

    if (!eventType || !chargeData) {
      return new Response(JSON.stringify({ error: 'Invalid webhook payload' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Extract user_id from charge metadata
    const userId = chargeData.metadata?.user_id
    if (!userId) {
      console.error('No user_id in charge metadata')
      return new Response(JSON.stringify({ error: 'No user_id in metadata' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (eventType === 'charge.complete') {
      const amount = chargeData.amount
      const amountInBaht = amount / 100

      // Credit wallet
      const { error: creditError } = await supabaseAdmin.rpc('credit_wallet', {
        p_user_id: userId,
        p_amount: amount,
        p_type: 'topup',
        p_description: `Top-up ฿${amountInBaht.toLocaleString()} (3DS verified)`,
        p_metadata: { charge_id: chargeData.id },
      })

      if (creditError) {
        console.error('Failed to credit wallet:', creditError)
        return new Response(JSON.stringify({ error: creditError.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      // Create success notification
      await supabaseAdmin.from('notifications').insert({
        user_id: userId,
        title: 'Wallet topped up!',
        message: `฿${amountInBaht.toLocaleString()} has been added to your wallet.`,
        icon: 'account_balance_wallet',
        icon_color: 'text-primary',
        href: '/wallet',
      })
    } else if (eventType === 'charge.failed') {
      // Create failure notification
      await supabaseAdmin.from('notifications').insert({
        user_id: userId,
        title: 'Payment failed',
        message: 'Your top-up payment could not be processed. Please try again.',
        icon: 'error',
        icon_color: 'text-red-400',
        href: '/top-up',
      })
    }

    // Always return 200 to acknowledge webhook
    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Webhook error:', error)
    // Return 200 anyway to prevent Omise from retrying
    return new Response(JSON.stringify({ received: true, error: (error as Error).message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
