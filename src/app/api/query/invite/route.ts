export const runtime = "nodejs";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await auth();

  if (!session || !session.user || !session.user.email) redirect("/login");

  const q = request.nextUrl.searchParams.get("q");

  if (!q) return NextResponse.json(false);

  return NextResponse.json(
    (await prisma.invite.count({
      where: {
        AND: [
          { receiver: { email: q } },
          { sender: { email: session.user.email } },
        ],
      },
    })) > 0
  );
}

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session || !session.user || !session.user.email) redirect("/login");

  const { sendTo }: { sendTo: string } = await request.json();
  if (!sendTo) return NextResponse.redirect("/login");

  const receiver = await prisma.user.findUnique({
    where: { email: sendTo },
  });
  if (!receiver) return NextResponse.redirect("/login");

  const sender = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!sender) return NextResponse.redirect("/login");

  const reverseInviteExists = await prisma.invite.findUnique({
    where: {
      senderId_receiverId: { senderId: receiver.id, receiverId: sender.id },
    },
  });
  if (reverseInviteExists) return NextResponse.redirect("/login");

  const invite = await prisma.invite.create({
    data: { receiverId: receiver.id, senderId: sender.id },
  });
  return NextResponse.json(invite);
}
