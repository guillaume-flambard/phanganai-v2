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

    const { amount, merchant_id, description } = await req.json()

    if (!amount || amount <= 0) {
      return new Response(JSON.stringify({ error: 'Invalid amount' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Debit wallet atomically
    const { data: txId, error: debitError } = await supabaseAdmin.rpc('debit_wallet', {
      p_user_id: user.id,
      p_amount: amount,
      p_type: 'payment',
      p_description: description || 'Scan to Pay',
      p_metadata: merchant_id ? { merchant_id } : null,
    })

    if (debitError) {
      return new Response(JSON.stringify({ error: debitError.message }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Create notification
    const amountInBaht = amount / 100
    await supabaseAdmin.from('notifications').insert({
      user_id: user.id,
      title: 'Payment sent!',
      message: `฿${amountInBaht.toLocaleString()} paid to ${description || 'merchant'}.`,
      icon: 'payments',
      icon_color: 'text-primary',
      href: '/transactions',
    })

    return new Response(JSON.stringify({ success: true, transaction_id: txId }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
