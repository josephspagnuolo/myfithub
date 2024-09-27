import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id)
    return NextResponse.json({ error: "Not Authenticated" }, { status: 400 });

  const id = session.user.id;
  const { content } = await req.json();
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (user) {
    const workout = await prisma.workout.create({
      data: {
        content,
        userId: user.id,
        createdAt: new Date()
      },
    });
    return NextResponse.json({ workout: workout });
  }
}
