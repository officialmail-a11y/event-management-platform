import { getCsvParticipants, type CsvParticipant } from "@/app/lib/csv-participants";
import { DashboardView } from "@/app/dashboard-view";

// Always re-fetch the sheet on request; this data is meant to reflect live
// edits, and must never be baked in as a static build-time snapshot.
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  let participants: CsvParticipant[] = [];
  let loadError: string | null = null;

  try {
    participants = await getCsvParticipants();
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Unknown error.";
  }

  return <DashboardView participants={participants} loadError={loadError} />;
}
