import Papa from "papaparse";

export type AttendanceStatus = "registered" | "present" | "absent";

export type CsvParticipant = {
  name: string;
  agency: string;
  position: string;
  gender: string;
  attendanceStatus: AttendanceStatus;
  preTestScore: number | null;
  postTestScore: number | null;
  workshopSubmitted: boolean;
  certificateIssued: boolean;
};

type CsvRow = Record<string, string>;

function normalizeHeader(header: string): string {
  return header.trim().toLowerCase();
}

// Looks up a cell by matching the CSV header rather than an exact name, so
// small differences in the sheet's column titles (casing, wording, trailing
// spaces) don't break ingestion.
function findValue(row: CsvRow, matchesHeader: (header: string) => boolean): string {
  for (const header of Object.keys(row)) {
    if (matchesHeader(normalizeHeader(header))) {
      return (row[header] ?? "").trim();
    }
  }
  return "";
}

function toAttendanceStatus(raw: string): AttendanceStatus {
  const value = raw.toLowerCase();
  if (["present", "attended", "yes", "y"].includes(value)) return "present";
  if (["absent", "no", "n", "no-show", "no show"].includes(value)) {
    return "absent";
  }
  return "registered";
}

function toScore(raw: string): number | null {
  if (!raw) return null;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : null;
}

function toBoolean(raw: string): boolean {
  const value = raw.toLowerCase();
  return ["true", "yes", "y", "1", "x", "done", "submitted", "issued"].includes(
    value
  );
}

function isBlankRow(row: CsvRow): boolean {
  return Object.values(row).every((value) => !value || !value.trim());
}

function mapRow(row: CsvRow): CsvParticipant {
  // Note: matching a lone `h.includes("name")` would also match "surname"
  // (contains "name") and "agency full name", so each name part is matched
  // by its own specific keyword rather than the generic word "name".
  const surname = findValue(
    row,
    (h) => h.includes("surname") || (h.includes("last") && h.includes("name"))
  );
  const firstName = findValue(
    row,
    (h) => h.includes("first") && h.includes("name")
  );
  const middleName = findValue(
    row,
    (h) => h.includes("middle") && h.includes("name")
  );
  const fullName = [firstName, middleName, surname]
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  const agency = findValue(
    row,
    (h) => h.includes("agency") || h.includes("office")
  );
  const position = findValue(row, (h) => h.includes("position"));
  const gender = findValue(row, (h) => h.includes("gender"));

  return {
    name: (fullName || "Unnamed participant").toUpperCase(),
    agency: (agency || "—").toUpperCase(),
    position: (position || "—").toUpperCase(),
    gender: (gender || "—").toUpperCase(),
    attendanceStatus: toAttendanceStatus(
      findValue(row, (h) => h.includes("attendance"))
    ),
    preTestScore: toScore(
      findValue(row, (h) => h.includes("pre") && h.includes("test"))
    ),
    postTestScore: toScore(
      findValue(row, (h) => h.includes("post") && h.includes("test"))
    ),
    workshopSubmitted: toBoolean(findValue(row, (h) => h.includes("workshop"))),
    certificateIssued: toBoolean(
      findValue(row, (h) => h.includes("certificate"))
    ),
  };
}

// Fetches the published Google Sheet CSV (set PARTICIPANTS_CSV_URL) and maps
// each row to our participant fields. Server-only: reads a server env var
// and does a server-side fetch, never called from the client.
export async function getCsvParticipants(): Promise<CsvParticipant[]> {
  const url = process.env.PARTICIPANTS_CSV_URL;
  if (!url) {
    throw new Error(
      "Missing PARTICIPANTS_CSV_URL environment variable. Set it to your published Google Sheet CSV URL (File > Share > Publish to web > CSV)."
    );
  }

  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch participants CSV (${response.status} ${response.statusText}). Confirm the sheet is published to the web as CSV.`
    );
  }

  const csvText = await response.text();
  const { data } = Papa.parse<CsvRow>(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  return data.filter((row) => !isBlankRow(row)).map(mapRow);
}
