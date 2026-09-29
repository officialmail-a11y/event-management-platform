import Link from "next/link";
import { getEvents } from "@/app/lib/events";

export default async function Home() {
  const events = await getEvents();

  return (
    <div className="mx-auto w-full max-w-[991px] px-4 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-[2rem] font-bold leading-[1.2] text-ink">
          Events
        </h1>
        <Link
          href="/events/new"
          className="rounded-[6.2rem] bg-accent px-4 py-2 text-sm font-medium text-black transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
        >
          New Event
        </Link>
      </div>

      {events.length === 0 ? (
        <p className="mt-8 text-sm text-muted">No events yet.</p>
      ) : (
        <ul className="mt-8 flex flex-col gap-4">
          {events.map((event) => (
            <li key={event.id}>
              <Link
                href={`/events/${event.id}`}
                className="flex flex-col gap-2 rounded-[6.2rem] border border-line bg-surface p-4 transition-colors hover:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-base font-semibold leading-[1.2] text-ink">
                    {event.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center rounded-[9999px] border border-line bg-background px-2 py-1 text-xs font-medium text-muted">
                      {event.date}
                    </span>
                    <span className="inline-flex items-center rounded-[9999px] border border-line bg-background px-2 py-1 text-xs font-medium text-muted">
                      {event.location}
                    </span>
                  </div>
                </div>
                {event.description && (
                  <p className="text-[0.875rem] leading-[1.5] text-ink/80">
                    {event.description}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
