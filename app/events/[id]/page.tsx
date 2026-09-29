import Link from "next/link";
import { notFound } from "next/navigation";
import { getEvent } from "@/app/lib/events";
import { DeleteEventButton } from "./delete-event-button";

export default async function EventDetailPage(
  props: PageProps<"/events/[id]">
) {
  const { id } = await props.params;
  const event = await getEvent(id);

  if (!event) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-12">
      <Link
        href="/events"
        className="rounded-[6.2rem] text-sm text-muted transition-colors hover:text-ink"
      >
        &larr; Back to events
      </Link>

      <div className="mt-4 flex flex-col gap-4 rounded-[6.2rem] border border-line bg-surface p-6">
        <h1 className="text-[2rem] font-bold leading-[1.2] text-ink">
          {event.title}
        </h1>

        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-[9999px] border border-line bg-background px-2 py-1 text-xs font-medium text-muted">
            {event.date}
          </span>
          <span className="inline-flex items-center rounded-[9999px] border border-line bg-background px-2 py-1 text-xs font-medium text-muted">
            {event.location}
          </span>
        </div>

        {event.description && (
          <p className="text-[0.875rem] leading-[1.5] text-ink/80">
            {event.description}
          </p>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Link
          href={`/events/${event.id}/edit`}
          className="rounded-[6.2rem] border border-line px-4 py-2 text-sm text-ink transition-colors hover:bg-surface"
        >
          Edit
        </Link>
        <DeleteEventButton id={event.id} />
      </div>
    </div>
  );
}
