"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { updateEvent } from "@/app/lib/events";

export type EditEventState = {
  errors: {
    title?: string;
    date?: string;
    location?: string;
  };
};

export async function editEvent(
  id: string,
  _prevState: EditEventState,
  formData: FormData
): Promise<EditEventState> {
  const title = String(formData.get("title") ?? "").trim();
  const date = String(formData.get("date") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  const errors: EditEventState["errors"] = {};
  if (!title) errors.title = "Title is required.";
  if (!date) errors.date = "Date is required.";
  if (!location) errors.location = "Location is required.";

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  await updateEvent(id, { title, date, location, description });
  revalidatePath("/");
  revalidatePath(`/events/${id}`);
  redirect(`/events/${id}`);
}
