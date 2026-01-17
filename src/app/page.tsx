import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session?.user) redirect("/signup");

  return (
    <main className="container">
      <header className="">
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button className="btn btn-primary">Logout</button>
        </form>
      </header>
    </main>
  );
}
