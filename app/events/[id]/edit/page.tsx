import Link from "next/link";
import { notFound } from "next/navigation";
import { getEvent } from "@/app/lib/events";
import { EditEventForm } from "./edit-event-form";

export default async function EditEventPage(
  props: PageProps<"/events/[id]/edit">
) {
  const { id } = await props.params;
  const event = await getEvent(id);

  if (!event) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-12">
      <Link
        href={`/events/${event.id}`}
        className="rounded-[6.2rem] text-sm text-muted transition-colors hover:text-ink"
      >
        &larr; Back to event
      </Link>

      <h1 className="mt-4 text-[2rem] font-bold leading-[1.2] text-ink">
        Edit event
      </h1>

      <EditEventForm event={event} />
    </div>
  );
}
