import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "./prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        let user = null;

        user = await prisma.user.findFirst({
          where: { email: credentials.email as string },
        });

        if (!user) throw new Error("account with this email does not exist");

        const passwordMatches = await bcrypt.compare(
          credentials.password as string,
          user.password,
        );

        if (!passwordMatches) throw new Error("password does not match");

        return { ...user, id: user.id.toString() };
      },
    }),
  ],
});
