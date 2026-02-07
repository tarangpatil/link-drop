import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { encodeChatRoom } from "@/utils/generic";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session?.user?.email) redirect("/signup");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      chatAsA: { include: { userA: true, userB: true } },
      chatAsB: { include: { userA: true, userB: true } },
    },
  });

  if (!user) redirect("/login");

  const allChats = [
    ...user.chatAsA.map(({ userA, userAId, userB, userBId }) => ({
      recipient: userAId === user.id ? userB : userA,
      chatRoom: encodeChatRoom({ userAId, userBId }),
    })),
    ...user.chatAsB.map(({ userA, userAId, userB, userBId }) => ({
      recipient: userAId === user.id ? userB : userA,
      chatRoom: encodeChatRoom({ userAId, userBId }),
    })),
  ];

  return (
    <main className="container my-3">
      <h2 className="mb-3">Hi {session.user.name}</h2>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          aria-label="Search"
        />
        <button className="btn btn-primary" type="button">
          <i className="bi bi-search-heart"></i> Search
        </button>
      </div>
      <ul className="list-group mb-3">
        {allChats.map((chat, idx) => (
          <li className="list-group-item" key={idx}>
            <Link href={`/dropchat/${chat.chatRoom}`}>
              {chat.recipient.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
