import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export default async function Home() {
  const id = 1;
  const name = "Tarang Patil";
  const email = "turupatil@linkdrop.com";
  const password = await bcrypt.hash("very-secure-password", 12);

  await prisma.user.deleteMany();
  const turuPatil = await prisma.user.create({
    data: { id, name, email, password },
  });

  return (
    <main className="container">
      <h1>Hi, {turuPatil.name}</h1>
      <code>{JSON.stringify(turuPatil)}</code>
    </main>
  );
}
