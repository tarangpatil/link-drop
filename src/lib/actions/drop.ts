"use server";

import { redirect } from "next/navigation";
import { auth } from "../auth";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import { encodeChatRoom } from "@/utils/generic";

export async function sendDrop(formData: FormData) {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");
  console.log(formData);
  const newDrop = await prisma.drop.create({
    data: {
      sender: { connect: { email: formData.get("sender-email") as string } },
      receiver: {
        connect: { email: formData.get("receiver-email") as string },
      },
      dropText: formData.get("drop-text") as string,
    },
    include: { sender: true, receiver: true },
  });
  console.log({ newDrop });
  const { receiverId, senderId } = newDrop;

  revalidatePath(
    `/dropchat/${encodeChatRoom({
      userAId: Math.min(senderId, receiverId),
      userBId: Math.max(senderId, receiverId),
    })}`
  );
}
