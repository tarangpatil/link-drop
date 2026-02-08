"use server";

import { redirect } from "next/navigation";
import { auth } from "../auth";
import { prisma } from "../prisma";

export async function sendDrop(
  _initState: { errors?: string },
  formData: FormData
): Promise<{ errors?: string }> {
  const session = await auth();
  if (!session?.user?.email) return { errors: "Not authenticated" };

  try {
    new URL(formData.get("drop-text") as string);
  } catch (error) {
    console.error(error);
    return { errors: "Invalid URL" };
  }
  const dropURL = new URL(formData.get("drop-text") as string);
  dropURL.searchParams.delete("igsh");
  dropURL.searchParams.delete("si");

  await prisma.drop.create({
    data: {
      sender: { connect: { email: formData.get("sender-email") as string } },
      receiver: {
        connect: { email: formData.get("receiver-email") as string },
      },
      dropText: dropURL.toString(),
    },
    include: { sender: true, receiver: true },
  });
  return {};
}
