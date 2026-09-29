"use client";

import { useActionState } from "react";
import { editEvent, type EditEventState } from "./actions";
import type { Event } from "@/app/lib/events";

const initialState: EditEventState = { errors: {} };

const inputClass =
  "rounded-[6.2rem] border border-line bg-background px-3 py-2 text-[0.875rem] text-ink outline-none focus:border-accent focus:ring-2 focus:ring-accent/40";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <span className="inline-flex w-fit items-center rounded-[9999px] bg-warning px-2 py-1 text-xs font-medium text-black">
      {message}
    </span>
  );
}

export function EditEventForm({ event }: { event: Event }) {
  const updateWithId = editEvent.bind(null, event.id);
  const [state, formAction, pending] = useActionState(
    updateWithId,
    initialState
  );

  return (
    <form action={formAction} className="mt-8 flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="text-xs font-medium text-muted">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={event.title}
          className={inputClass}
        />
        <FieldError message={state.errors.title} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="date" className="text-xs font-medium text-muted">
          Date
        </label>
        <input
          id="date"
          name="date"
          type="date"
          defaultValue={event.date}
          className={inputClass}
        />
        <FieldError message={state.errors.date} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="location" className="text-xs font-medium text-muted">
          Location
        </label>
        <input
          id="location"
          name="location"
          type="text"
          defaultValue={event.location}
          className={inputClass}
        />
        <FieldError message={state.errors.location} />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="description"
          className="text-xs font-medium text-muted"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={event.description}
          className={`${inputClass} rounded-[1rem]`}
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-2 rounded-[6.2rem] bg-accent px-5 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-50"
      >
        {pending ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}
