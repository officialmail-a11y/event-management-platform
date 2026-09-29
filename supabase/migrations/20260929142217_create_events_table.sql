-- Events table for the event management platform.
create table public.events (
  id bigint generated always as identity primary key,
  title text not null,
  date date not null,
  location text not null,
  description text not null default '',
  created_at timestamptz not null default now()
);

comment on table public.events is 'Events shown on the events homepage and detail pages.';

-- RLS is enabled with no policies: the Data API (anon/authenticated) has no
-- access to this table. All reads/writes go through Next.js Server Actions
-- using the service_role key, which bypasses RLS by design.
alter table public.events enable row level security;
