import { auth, signOut } from "@/lib/auth";
import Navbar from "@/ui/Navbar";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session?.user) redirect("/signup");

  return (
    <main className="container">
      <header className="">
      </header>
    </main>
  );
}
