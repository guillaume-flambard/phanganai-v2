-- Fix mutable search_path on security definer functions
-- Ref: https://supabase.com/docs/guides/database/database-linter?lint=0011_function_search_path_mutable

CREATE OR REPLACE FUNCTION public.debit_wallet(p_user_id uuid, p_amount int, p_description text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_wallet_id uuid;
  v_balance int;
BEGIN
  SELECT id, balance INTO v_wallet_id, v_balance
  FROM wallets WHERE user_id = p_user_id FOR UPDATE;

  IF v_balance < p_amount THEN
    RAISE EXCEPTION 'Insufficient balance';
  END IF;

  UPDATE wallets SET balance = balance - p_amount, updated_at = now() WHERE id = v_wallet_id;

  INSERT INTO transactions (wallet_id, type, amount, description)
  VALUES (v_wallet_id, 'payment', -p_amount, p_description);
END;
$$;

CREATE OR REPLACE FUNCTION public.credit_wallet(p_user_id uuid, p_amount int, p_description text, p_type text DEFAULT 'topup')
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_wallet_id uuid;
BEGIN
  SELECT id INTO v_wallet_id
  FROM wallets WHERE user_id = p_user_id FOR UPDATE;

  UPDATE wallets SET balance = balance + p_amount, updated_at = now() WHERE id = v_wallet_id;

  INSERT INTO transactions (wallet_id, type, amount, description)
  VALUES (v_wallet_id, p_type, p_amount, p_description);
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture', '')
  );
  INSERT INTO public.wallets (user_id) VALUES (NEW.id);
  RETURN NEW;
END;
$$;
