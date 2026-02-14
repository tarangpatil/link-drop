import { auth, signIn } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await auth();
  if (session) redirect("/");
  return (
    <main className="container my-5 ">
      <form
        className="w-50 mx-auto"
        action={async (formData) => {
          "use server";

          await signIn("credentials", {
            redirect: false,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
          });
          return redirect("/");
        }}
      >
        <div className="mb-3">
          <h3>Log-In</h3>
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
          Don&rsquo;t have an account?{" "}
          <Link href={"/signup"} className="link-primary">
            Signup here!
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
