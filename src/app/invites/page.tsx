import { acceptInvite, deleteInvite } from "@/lib/actions/invite";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function () {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  const invites = await prisma.invite.findMany({
    where: { receiver: { email: session.user.email } },
    select: { receiver: true, sender: true },
  });

  return (
    <main className="container my-4">
      <ul className="list-group">
        {invites.map((invite, idx) => (
          <li key={idx} className="list-group-item">
            <div className="my-0 d-flex justify-content-between align-items-center">
              {invite.sender.name}
              <span className="d-flex">
                <form action={acceptInvite}>
                  <input
                    type="hidden"
                    name="invite"
                    value={JSON.stringify({ invite })}
                  />
                  <button
                    className="btn btn-outline-success mx-1"
                    type="submit"
                  >
                    <i className="bi bi-person-check"></i> Accept
                  </button>
                </form>
                <form action={deleteInvite}>
                  <button className="btn btn-outline-danger mx-1">
                    <i className="bi bi-trash3"></i> Delete
                  </button>
                </form>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
