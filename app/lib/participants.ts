import { supabase } from "@/app/lib/supabase";

export type AttendanceStatus = "registered" | "present" | "absent";

export type Participant = {
  id: string;
  eventId: string;
  eventTitle: string;
  name: string;
  email: string;
  attendanceStatus: AttendanceStatus;
  preTestScore: number | null;
  postTestScore: number | null;
  workshopSubmitted: boolean;
  certificateIssued: boolean;
};

type ParticipantRow = {
  id: number;
  event_id: number;
  name: string;
  email: string;
  attendance_status: AttendanceStatus;
  pre_test_score: number | null;
  post_test_score: number | null;
  workshop_submitted: boolean;
  certificate_issued: boolean;
  events: { title: string } | null;
};

const PARTICIPANT_COLUMNS =
  "id, event_id, name, email, attendance_status, pre_test_score, post_test_score, workshop_submitted, certificate_issued, events(title)";

function toParticipant(row: ParticipantRow): Participant {
  return {
    id: String(row.id),
    eventId: String(row.event_id),
    eventTitle: row.events?.title ?? "—",
    name: row.name,
    email: row.email,
    attendanceStatus: row.attendance_status,
    preTestScore: row.pre_test_score,
    postTestScore: row.post_test_score,
    workshopSubmitted: row.workshop_submitted,
    certificateIssued: row.certificate_issued,
  };
}

// The `id` column is bigint; anything non-numeric can never match a row.
export function toRowId(id: string): number | null {
  return /^\d+$/.test(id) ? Number(id) : null;
}

export async function getParticipants(): Promise<Participant[]> {
  const { data, error } = await supabase
    .from("participants")
    .select(PARTICIPANT_COLUMNS)
    .order("id", { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => toParticipant(row as unknown as ParticipantRow));
}
