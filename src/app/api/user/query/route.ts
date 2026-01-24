import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q");
  if (!q) return NextResponse.json([]);
  const users = await prisma.user.findMany({
    where: {
      OR: [
        { email: { contains: `%${q}%`, mode: "insensitive" } },
        { name: { contains: `%${q}%`, mode: "insensitive" } },
      ],
    },
    omit: { password: true, email: true },
  });
  return NextResponse.json(users);
}
