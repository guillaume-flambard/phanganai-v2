-- Drop old function overloads that don't have search_path set
DROP FUNCTION IF EXISTS public.debit_wallet(uuid, integer, text, text, jsonb);
DROP FUNCTION IF EXISTS public.credit_wallet(uuid, integer, text, text, jsonb);
