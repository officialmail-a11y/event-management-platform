"use client";

import type { AttendanceStatus, CsvParticipant } from "@/app/lib/csv-participants";
import { MotionSection, MotionStaggerGroup } from "@/app/motion-primitives";
import { panel, panelHover, solidPanel } from "@/app/lib/ui";

const ATTENDANCE_STYLES: Record<AttendanceStatus, string> = {
  registered: "border border-line bg-background text-muted",
  present: "bg-success text-black",
  absent: "bg-warning text-black",
};

function AttendanceBadge({ status }: { status: AttendanceStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-[9999px] px-2 py-1 text-xs font-medium capitalize ${ATTENDANCE_STYLES[status]}`}
    >
      {status}
    </span>
  );
}

function ScoreIndicator({ score }: { score: number | null }) {
  if (score === null) {
    return <span className="text-xs text-muted">—</span>;
  }

  const pct = Math.max(0, Math.min(100, score));
  const fill =
    pct >= 80 ? "bg-success" : pct >= 50 ? "bg-accent" : "bg-warning";

  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 overflow-hidden rounded-[9999px] bg-surface">
        <div className={`h-full ${fill}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="w-6 text-xs font-medium text-ink">{score}</span>
    </div>
  );
}

// Read-only status pill: the participant list comes from a published Google
// Sheet CSV, which has no write-back path, so this is a visual indicator
// rather than a live Supabase-backed toggle.
function StatusPill({ active, label }: { active: boolean; label: string }) {
  return (
    <span
      role="img"
      aria-label={`${label}: ${active ? "yes" : "no"}`}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-[9999px] border ${
        active ? "border-accent bg-accent" : "border-line bg-background"
      }`}
    >
      <span
        className={`absolute top-0.5 h-4 w-4 rounded-[9999px] bg-white shadow-sm transition-transform ${
          active ? "translate-x-[22px]" : "translate-x-0.5"
        }`}
      />
    </span>
  );
}

function StatTile({ label, value }: { label: string; value: number }) {
  return (
    <MotionSection
      hover
      className={`flex cursor-default flex-col gap-1 p-4 ${panel} ${panelHover}`}
    >
      <span className="text-xs font-medium uppercase tracking-wide text-muted">
        {label}
      </span>
      <span className="text-[1.75rem] font-bold leading-[1.2] text-ink">
        {value}
      </span>
    </MotionSection>
  );
}

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-muted">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-medium text-ink">{value}</dd>
    </div>
  );
}

const TRAINING_MODULES = [
  "Module 1 · Anti-Graft (RA 3019) and Jurisprudence",
  "Module 2 · Public Office as a Public Trust",
  "Module 3 · RA 6713 and the Anti-Red Tape Act (RA 11032)",
];

export function DashboardView({
  participants,
  loadError,
}: {
  participants: CsvParticipant[];
  loadError: string | null;
}) {
  const total = participants.length;
  const present = participants.filter(
    (p) => p.attendanceStatus === "present"
  ).length;
  const workshopsSubmitted = participants.filter(
    (p) => p.workshopSubmitted
  ).length;
  const certificatesIssued = participants.filter(
    (p) => p.certificateIssued
  ).length;

  return (
    <MotionStaggerGroup className="mx-auto flex w-full max-w-[1280px] flex-col px-6 py-8">
      {/* Training program summary */}
      <MotionSection hover className={`p-6 ${panel} ${panelHover}`}>
        <span className="text-xs font-medium uppercase tracking-wide text-muted">
          Training Program
        </span>
        <h2 className="mt-1 text-xl font-bold leading-[1.2] text-ink">
          Public Service Accountability: Regulations, Protection, Guidance
          and Advice for Civil Servants Handling and Processing Government
          Records
        </h2>

        <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          <DetailField label="Dates" value="Oct 21–23, 2026" />
          <DetailField
            label="Venue"
            value="Golden Peak Hotel and Suites, Cebu City"
          />
          <DetailField
            label="Resource Speaker"
            value="Hon. Judge Briccio G. Parone, Jr."
          />
          <DetailField label="Training Credits" value="16 hours" />
          <DetailField label="Organized By" value="GROAP, Inc." />
        </dl>

        <div className="mt-4 flex flex-wrap gap-2">
          {TRAINING_MODULES.map((module) => (
            <span
              key={module}
              className="inline-flex items-center rounded-[9999px] border border-line bg-background px-2 py-1 text-xs font-medium text-muted"
            >
              {module}
            </span>
          ))}
        </div>
      </MotionSection>

      <MotionSection className="mt-8">
        <h2 className="text-xl font-bold leading-[1.2] text-ink">
          Participants
        </h2>
        <p className="mt-1 text-sm text-muted">
          Live-synced from the registered participants Google Sheet.
        </p>
      </MotionSection>

      <MotionStaggerGroup className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatTile label="Total Participants" value={total} />
        <StatTile label="Present" value={present} />
        <StatTile label="Workshops Submitted" value={workshopsSubmitted} />
        <StatTile label="Certificates Issued" value={certificatesIssued} />
      </MotionStaggerGroup>

      {loadError ? (
        <MotionSection className={`mt-6 p-6 ${panel}`}>
          <p className="text-sm font-semibold text-ink">
            Couldn&apos;t load participants from the Google Sheet.
          </p>
          <p className="mt-1 text-sm text-muted">{loadError}</p>
        </MotionSection>
      ) : participants.length === 0 ? (
        <p className="mt-8 text-sm text-muted">
          No participant rows found in the sheet.
        </p>
      ) : (
        <MotionSection className={`mt-6 overflow-hidden ${solidPanel}`}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1180px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-line bg-surface">
                  <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted">
                    Name
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted">
                    Agency/Office
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted">
                    Position
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted">
                    Gender
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted">
                    Attendance
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted">
                    Pre-Test
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted">
                    Post-Test
                  </th>
                  <th className="px-3 py-2 text-center text-xs font-medium uppercase tracking-wide text-muted">
                    Workshop
                  </th>
                  <th className="px-3 py-2 text-center text-xs font-medium uppercase tracking-wide text-muted">
                    Certificate
                  </th>
                </tr>
              </thead>
              <tbody>
                {participants.map((p, index) => (
                  <tr
                    key={`${p.name}-${index}`}
                    className="border-b border-line last:border-0 hover:bg-surface/60"
                  >
                    <td className="px-3 py-2 font-medium text-ink">
                      {p.name}
                    </td>
                    <td className="px-3 py-2 text-ink/80">{p.agency}</td>
                    <td className="px-3 py-2 text-ink/80">{p.position}</td>
                    <td className="px-3 py-2 text-ink/80">{p.gender}</td>
                    <td className="px-3 py-2">
                      <AttendanceBadge status={p.attendanceStatus} />
                    </td>
                    <td className="px-3 py-2">
                      <ScoreIndicator score={p.preTestScore} />
                    </td>
                    <td className="px-3 py-2">
                      <ScoreIndicator score={p.postTestScore} />
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex justify-center">
                        <StatusPill
                          active={p.workshopSubmitted}
                          label={`Workshop submitted for ${p.name}`}
                        />
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex justify-center">
                        <StatusPill
                          active={p.certificateIssued}
                          label={`Certificate issued for ${p.name}`}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </MotionSection>
      )}
    </MotionStaggerGroup>
  );
}
