import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const REFERRAL_BONUS = 5000 // 5000 satang = 50 baht

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

    const { referral_code } = await req.json()

    if (!referral_code) {
      return new Response(JSON.stringify({ error: 'Referral code is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Find referrer by referral_code
    const { data: referrer, error: referrerError } = await supabaseAdmin
      .from('profiles')
      .select('id, display_name')
      .eq('referral_code', referral_code)
      .single()

    if (referrerError || !referrer) {
      return new Response(JSON.stringify({ error: 'Invalid referral code' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Verify not self-referral
    if (referrer.id === user.id) {
      return new Response(JSON.stringify({ error: 'You cannot use your own referral code' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Verify user hasn't already used a referral
    const { data: existingReferral } = await supabaseAdmin
      .from('referrals')
      .select('id')
      .eq('referred_id', user.id)
      .maybeSingle()

    if (existingReferral) {
      return new Response(JSON.stringify({ error: 'You have already used a referral code' }), {
        status: 409,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Credit both wallets 50 baht (5000 satang)
    const { error: creditReferredError } = await supabaseAdmin.rpc('credit_wallet', {
      p_user_id: user.id,
      p_amount: REFERRAL_BONUS,
      p_type: 'referral',
      p_description: 'Referral bonus',
      p_metadata: { referrer_id: referrer.id },
    })

    if (creditReferredError) {
      return new Response(JSON.stringify({ error: creditReferredError.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const { error: creditReferrerError } = await supabaseAdmin.rpc('credit_wallet', {
      p_user_id: referrer.id,
      p_amount: REFERRAL_BONUS,
      p_type: 'referral',
      p_description: 'Referral bonus - friend joined',
      p_metadata: { referred_id: user.id },
    })

    if (creditReferrerError) {
      console.error('Failed to credit referrer wallet:', creditReferrerError)
    }

    // Create referral record
    const { error: referralError } = await supabaseAdmin
      .from('referrals')
      .insert({
        referrer_id: referrer.id,
        referred_id: user.id,
        code_used: referral_code,
        bonus_paid: true,
      })

    if (referralError) {
      console.error('Failed to create referral record:', referralError)
    }

    // Create notifications for both users
    await supabaseAdmin.from('notifications').insert([
      {
        user_id: user.id,
        title: 'Referral bonus!',
        message: `You earned ฿50 for using ${referrer.display_name || 'a friend'}'s referral code.`,
        icon: 'card_giftcard',
        icon_color: 'text-gold',
        href: '/wallet',
      },
      {
        user_id: referrer.id,
        title: 'Referral bonus!',
        message: 'A friend joined using your code. You earned ฿50!',
        icon: 'card_giftcard',
        icon_color: 'text-gold',
        href: '/wallet',
      },
    ])

    return new Response(JSON.stringify({ success: true, bonus: REFERRAL_BONUS / 100 }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
