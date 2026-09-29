"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addEvent } from "@/app/lib/events";

export type CreateEventState = {
  errors: {
    title?: string;
    date?: string;
    location?: string;
    description?: string;
  };
};

export async function createEvent(
  _prevState: CreateEventState,
  formData: FormData
): Promise<CreateEventState> {
  const title = String(formData.get("title") ?? "").trim();
  const date = String(formData.get("date") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  const errors: CreateEventState["errors"] = {};
  if (!title) errors.title = "Title is required.";
  if (!date) errors.date = "Date is required.";
  if (!location) errors.location = "Location is required.";

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  await addEvent({ title, date, location, description });
  revalidatePath("/events");
  redirect("/events");
}
