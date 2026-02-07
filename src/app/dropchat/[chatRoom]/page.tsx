import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { decodeChatRoom } from "@/utils/generic";
import { redirect } from "next/navigation";
import ChatWindow from "./ChatWindow";

type Props = {
  params: Promise<{ chatRoom: string }>;
};

export default async function ({ params }: Props) {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  const { chatRoom } = await params;

  const userAId_userBId = decodeChatRoom<{
    userAId: number;
    userBId: number;
  }>(chatRoom);

  const dropchat = await prisma.dropChat.findUniqueOrThrow({
    where: { userAId_userBId },
    include: { userA: true, userB: true },
  });

  if (
    dropchat.userA.email !== session.user.email &&
    dropchat.userB.email !== session.user.email
  )
    redirect("/login");
  const [user, recipient] =
    dropchat.userA.email === session.user.email
      ? [dropchat.userA, dropchat.userB]
      : [dropchat.userB, dropchat.userA];

  return (
    <main className="container my-3">
      <h3 className="mb-3">Your drops with {recipient.name}</h3>
      <form>
        <div className="input-group">
          <input
            type="text"
            name="drop-link"
            placeholder="Send another drop"
            className="form-control"
          />
          <button className="btn btn-primary" type="submit">
            <i className="bi bi-send"></i> Send
          </button>
        </div>
      </form>
      <ChatWindow />
    </main>
  );
}
