"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { deleteEvent as deleteEventFromStore } from "@/app/lib/events";

export async function deleteEvent(id: string) {
  await deleteEventFromStore(id);
  revalidatePath("/");
  redirect("/");
}
