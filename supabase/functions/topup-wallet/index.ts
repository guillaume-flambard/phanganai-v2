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

    const { amount, token } = await req.json()

    if (!amount || amount <= 0) {
      return new Response(JSON.stringify({ error: 'Invalid amount' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (!token) {
      return new Response(JSON.stringify({ error: 'Payment token is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Create Omise charge
    const omiseRes = await fetch('https://api.omise.co/charges', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(Deno.env.get('OMISE_SECRET_KEY')! + ':'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        amount: amount.toString(),
        currency: 'thb',
        card: token,
        metadata: JSON.stringify({ user_id: user.id }),
      }),
    })

    const charge = await omiseRes.json()

    if (!omiseRes.ok) {
      return new Response(JSON.stringify({ error: charge.message || 'Payment failed' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // If 3DS is required, return the authorize URI
    if (charge.status === 'pending' && charge.authorize_uri) {
      return new Response(JSON.stringify({
        success: false,
        requires_3ds: true,
        authorize_uri: charge.authorize_uri,
        charge_id: charge.id,
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // If charge succeeded immediately (no 3DS), credit wallet
    if (charge.status === 'successful') {
      const amountInBaht = amount / 100
      const { error: creditError } = await supabaseAdmin.rpc('credit_wallet', {
        p_user_id: user.id,
        p_amount: amount,
        p_type: 'topup',
        p_description: `Top-up ฿${amountInBaht.toLocaleString()}`,
        p_metadata: { charge_id: charge.id },
      })

      if (creditError) {
        return new Response(JSON.stringify({ error: creditError.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      // Create notification
      await supabaseAdmin.from('notifications').insert({
        user_id: user.id,
        title: 'Wallet topped up!',
        message: `฿${amountInBaht.toLocaleString()} has been added to your wallet.`,
        icon: 'account_balance_wallet',
        icon_color: 'text-primary',
        href: '/wallet',
      })

      return new Response(JSON.stringify({ success: true, charge_id: charge.id }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Charge failed
    return new Response(JSON.stringify({ error: 'Payment was not successful', status: charge.status }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
