-- This app has no authentication system: any visitor can already create,
-- edit, and delete events (matching the previous in-memory mock behavior).
-- These policies make that the same at the database level, scoped to the
-- anon/authenticated roles used by the app's Supabase client.
create policy "public can read events"
on public.events for select
to anon, authenticated
using (true);

create policy "public can insert events"
on public.events for insert
to anon, authenticated
with check (true);

create policy "public can update events"
on public.events for update
to anon, authenticated
using (true)
with check (true);

create policy "public can delete events"
on public.events for delete
to anon, authenticated
using (true);
