create or replace function public.debit_wallet(
  p_user_id uuid,
  p_amount int,
  p_type text,
  p_description text,
  p_metadata jsonb default null
) returns uuid as $$
declare
  v_wallet_id uuid;
  v_tx_id uuid;
begin
  select id into v_wallet_id from public.wallets where user_id = p_user_id for update;
  if v_wallet_id is null then raise exception 'Wallet not found'; end if;

  update public.wallets set balance = balance - p_amount, updated_at = now()
  where id = v_wallet_id and balance >= p_amount;
  if not found then raise exception 'Insufficient balance'; end if;

  insert into public.transactions (wallet_id, type, amount, description, metadata)
  values (v_wallet_id, p_type, -p_amount, p_description, p_metadata)
  returning id into v_tx_id;

  return v_tx_id;
end;
$$ language plpgsql security definer;

create or replace function public.credit_wallet(
  p_user_id uuid,
  p_amount int,
  p_type text,
  p_description text,
  p_metadata jsonb default null
) returns uuid as $$
declare
  v_wallet_id uuid;
  v_tx_id uuid;
begin
  select id into v_wallet_id from public.wallets where user_id = p_user_id for update;
  if v_wallet_id is null then raise exception 'Wallet not found'; end if;

  update public.wallets set balance = balance + p_amount, updated_at = now()
  where id = v_wallet_id;

  insert into public.transactions (wallet_id, type, amount, description, metadata)
  values (v_wallet_id, p_type, p_amount, p_description, p_metadata)
  returning id into v_tx_id;

  return v_tx_id;
end;
$$ language plpgsql security definer;
