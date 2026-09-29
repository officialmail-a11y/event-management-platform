"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { deleteEvent as deleteEventFromStore } from "@/app/lib/events";

export async function deleteEvent(id: string) {
  await deleteEventFromStore(id);
  // Deleting an event cascades to its participants (see migrations), which
  // changes the dashboard's stats/table.
  revalidatePath("/");
  revalidatePath("/events");
  redirect("/events");
}
