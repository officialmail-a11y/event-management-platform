-- Participants registered for an event, with attendance/testing/workshop
-- tracking for the Participant Management System.
create type public.attendance_status as enum ('registered', 'present', 'absent');

create table public.participants (
  id bigint generated always as identity primary key,
  event_id bigint not null references public.events (id) on delete cascade,
  name text not null,
  email text not null,
  attendance_status public.attendance_status not null default 'registered',
  pre_test_score integer,
  post_test_score integer,
  workshop_submitted boolean not null default false,
  certificate_issued boolean not null default false,
  created_at timestamptz not null default now(),
  unique (event_id, email)
);

comment on table public.participants is 'Participants registered for an event, with attendance and progress tracking.';

-- Foreign key columns are not auto-indexed by Postgres.
create index participants_event_id_idx on public.participants (event_id);

-- Same access model as public.events: no auth system in this app yet, so
-- RLS is enabled with explicit public policies rather than left policy-less.
alter table public.participants enable row level security;

create policy "public can read participants"
on public.participants for select
to anon, authenticated
using (true);

create policy "public can insert participants"
on public.participants for insert
to anon, authenticated
with check (true);

create policy "public can update participants"
on public.participants for update
to anon, authenticated
using (true)
with check (true);

create policy "public can delete participants"
on public.participants for delete
to anon, authenticated
using (true);
