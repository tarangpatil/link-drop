import { auth, signIn } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export default async function SignUp() {
  const session = await auth();

  if (session?.user) redirect("/");

  return (
    <main className="container my-5 ">
      <form
        className="w-50 mx-auto"
        action={async (formData) => {
          "use server";
          const name = formData.get("name") as string;
          const email = formData.get("email") as string;
          const password = formData.get("password") as string;
          const hashedPw = await bcrypt.hash(password, 12);
          await prisma.user.create({
            data: { name, email, password: hashedPw },
          });
          await signIn("credentials", { email, password, redirect: false });
          redirect("/login");
        }}
      >
        <div className="mb-3">
          <h3>Sign-Up</h3>
        </div>
        <div className="mb-3">
          <label htmlFor="name">Name</label>
          <input id="name" type="name" name="name" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="email">E-Mail</label>
          <input
            id="email"
            type="email"
            name="email"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className="form-control"
          />
        </div>
        <p className="mb-3">
          Already have an account?{" "}
          <Link href={"/login"} className="link-primary">
            Login here!
          </Link>
        </p>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            Log-In
          </button>
        </div>
      </form>
    </main>
  );
}
