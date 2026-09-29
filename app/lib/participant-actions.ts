"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/app/lib/supabase";
import { toRowId } from "@/app/lib/participants";

export async function setWorkshopSubmitted(id: string, value: boolean) {
  const rowId = toRowId(id);
  if (rowId === null) return;

  const { error } = await supabase
    .from("participants")
    .update({ workshop_submitted: value })
    .eq("id", rowId);

  if (error) throw new Error(error.message);
  revalidatePath("/");
}

export async function setCertificateIssued(id: string, value: boolean) {
  const rowId = toRowId(id);
  if (rowId === null) return;

  const { error } = await supabase
    .from("participants")
    .update({ certificate_issued: value })
    .eq("id", rowId);

  if (error) throw new Error(error.message);
  revalidatePath("/");
}
