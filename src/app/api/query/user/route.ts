import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session || !session.user || !session.user.email)
    return NextResponse.json([]);

  const q = request.nextUrl.searchParams.get("q");
  if (!q) return NextResponse.json([]);
  const users = await prisma.user.findMany({
    where: {
      AND: [
        {
          OR: [
            { email: { contains: `%${q}%`, mode: "insensitive" } },
            { name: { contains: `%${q}%`, mode: "insensitive" } },
          ],
        },
        { NOT: [{ email: session.user.email }] },
      ],
    },
    omit: { password: true },
  });

  return NextResponse.json(users);
}
