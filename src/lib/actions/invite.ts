"use server";

import { auth } from "../auth";
import { redirect } from "next/navigation";
import { prisma } from "../prisma";

export async function acceptInvite(formData: FormData) {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  const { sender, receiver } = (
    JSON.parse(formData.get("invite") as string) as {
      invite: {
        sender: {
          id: number;
          name: string;
          email: string;
        };
        receiver: {
          id: number;
          name: string;
          email: string;
        };
      };
    }
  ).invite;

  const [deletedInvite, createdDrop] = await prisma.$transaction([
    prisma.invite.delete({
      where: {
        senderId_receiverId: {
          senderId: sender.id,
          receiverId: receiver.id,
        },
      },
    }),
    prisma.drop.create({
      data: {
        userAId: Math.min(sender.id, receiver.id),
        userBId: Math.max(sender.id, receiver.id),
      },
    }),
  ]);
  redirect("/");
}

export async function deleteInvite(formData: FormData) {}
