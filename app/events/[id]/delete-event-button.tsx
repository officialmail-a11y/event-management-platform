"use client";

import { useState } from "react";
import { deleteEvent } from "./actions";

export function DeleteEventButton({ id }: { id: string }) {
  const [confirming, setConfirming] = useState(false);
  const deleteWithId = deleteEvent.bind(null, id);

  if (confirming) {
    return (
      <form action={deleteWithId} className="flex items-center gap-2">
        <span className="text-xs text-muted">Delete this event?</span>
        <button
          type="submit"
          className="rounded-[6.2rem] bg-warning px-4 py-2 text-sm font-medium text-black transition-opacity hover:opacity-90"
        >
          Confirm delete
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="rounded-[6.2rem] border border-line px-4 py-2 text-sm text-ink transition-colors hover:bg-surface"
        >
          Cancel
        </button>
      </form>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      className="rounded-[6.2rem] border border-line px-4 py-2 text-sm text-ink transition-colors hover:bg-surface"
    >
      Delete
    </button>
  );
}
