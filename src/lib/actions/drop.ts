"use server";

import { redirect } from "next/navigation";
import { auth } from "../auth";
import { prisma } from "../prisma";

export async function createDrop(formData: FormData) {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  const a = parseInt(formData.get("userA") as string);
  const b = parseInt(formData.get("userB") as string);

  const newDrop = await prisma.drop.create({
    data: { userAId: Math.min(a, b), userBId: Math.max(a, b) },
    include: { userA: true, userB: true },
  });
}
