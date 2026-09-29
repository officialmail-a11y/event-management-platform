import { supabase } from "@/app/lib/supabase";

export type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
};

type EventRow = {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
};

const EVENT_COLUMNS = "id, title, description, date, location";

function toEvent(row: EventRow): Event {
  return { ...row, id: String(row.id) };
}

// The `id` column is bigint; anything non-numeric can never match a row.
function toRowId(id: string): number | null {
  return /^\d+$/.test(id) ? Number(id) : null;
}

export async function getEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from("events")
    .select(EVENT_COLUMNS)
    .order("date", { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []).map(toEvent);
}

export async function getEvent(id: string): Promise<Event | undefined> {
  const rowId = toRowId(id);
  if (rowId === null) return undefined;

  const { data, error } = await supabase
    .from("events")
    .select(EVENT_COLUMNS)
    .eq("id", rowId)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data ? toEvent(data) : undefined;
}

export async function addEvent(event: Omit<Event, "id">): Promise<Event> {
  const { data, error } = await supabase
    .from("events")
    .insert(event)
    .select(EVENT_COLUMNS)
    .single();

  if (error) throw new Error(error.message);
  return toEvent(data);
}

export async function updateEvent(
  id: string,
  updates: Omit<Event, "id">
): Promise<Event | undefined> {
  const rowId = toRowId(id);
  if (rowId === null) return undefined;

  const { data, error } = await supabase
    .from("events")
    .update(updates)
    .eq("id", rowId)
    .select(EVENT_COLUMNS)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data ? toEvent(data) : undefined;
}

export async function deleteEvent(id: string): Promise<void> {
  const rowId = toRowId(id);
  if (rowId === null) return;

  const { error } = await supabase.from("events").delete().eq("id", rowId);
  if (error) throw new Error(error.message);
}
