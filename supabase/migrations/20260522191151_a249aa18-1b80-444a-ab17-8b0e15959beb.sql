create table public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  contact text not null,
  source text,
  user_agent text,
  referrer text,
  created_at timestamptz not null default now()
);

alter table public.waitlist_signups enable row level security;

-- Allow public inserts via server fn (uses admin client, but keep RLS sane)
create policy "no select" on public.waitlist_signups for select using (false);

create table public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  props jsonb not null default '{}'::jsonb,
  session_id text,
  url text,
  referrer text,
  user_agent text,
  created_at timestamptz not null default now()
);

create index analytics_events_name_created_at_idx on public.analytics_events (name, created_at desc);

alter table public.analytics_events enable row level security;
create policy "no select events" on public.analytics_events for select using (false);