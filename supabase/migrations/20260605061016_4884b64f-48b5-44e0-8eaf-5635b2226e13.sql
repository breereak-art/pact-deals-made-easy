
CREATE TYPE public.pact_status AS ENUM ('proposed', 'accepted', 'settled', 'disputed', 'cancelled');

CREATE TABLE public.pacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  short_id text NOT NULL UNIQUE DEFAULT upper(substring(replace(gen_random_uuid()::text, '-', ''), 1, 6)),
  status public.pact_status NOT NULL DEFAULT 'proposed',
  proposer_handle text NOT NULL,
  proposer_name text,
  opponent_handle text,
  opponent_name text,
  stake_amount numeric(12,2) NOT NULL,
  stake_currency text NOT NULL DEFAULT 'NGN',
  description text NOT NULL,
  thread_id text,
  space_id text,
  winner_handle text,
  raw_message text,
  source text NOT NULL DEFAULT 'imessage',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  accepted_at timestamptz,
  settled_at timestamptz
);

GRANT SELECT ON public.pacts TO authenticated;
GRANT ALL ON public.pacts TO service_role;

ALTER TABLE public.pacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admins read pacts"
  ON public.pacts FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "no public select pacts"
  ON public.pacts FOR SELECT
  TO public
  USING (false);

CREATE OR REPLACE FUNCTION public.touch_pacts_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER pacts_touch_updated_at
  BEFORE UPDATE ON public.pacts
  FOR EACH ROW EXECUTE FUNCTION public.touch_pacts_updated_at();

CREATE INDEX pacts_created_at_idx ON public.pacts (created_at DESC);
CREATE INDEX pacts_status_idx ON public.pacts (status);
CREATE INDEX pacts_thread_id_idx ON public.pacts (thread_id);
