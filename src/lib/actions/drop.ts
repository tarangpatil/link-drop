"use server";

import { redirect } from "next/navigation";
import { auth } from "../auth";

export async function sendDrop(formData: FormData) {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");
}
