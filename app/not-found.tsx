import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-[991px] flex-1 flex-col items-center justify-center gap-4 px-4 py-12 text-center">
      <h1 className="text-[2rem] font-bold leading-[1.2] text-ink">
        Not found
      </h1>
      <p className="text-[0.875rem] leading-[1.5] text-muted">
        We couldn&apos;t find the event or page you&apos;re looking for.
      </p>
      <Link
        href="/"
        className="rounded-[6.2rem] bg-accent px-4 py-2 text-sm font-medium text-black transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
      >
        Back to events
      </Link>
    </div>
  );
}
