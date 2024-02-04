import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session || !session.user || !session.user.email)
    return NextResponse.json({ error: "Not Authenticated" }, { status: 400 });

  const email = session.user.email;
  const { content } = await req.json();
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (user) {
    const workout = await prisma.workout.create({
      data: {
        content,
        userEmail: user.email + "",
        createdAt: new Date()
      },
    });
    return NextResponse.json({ workout: workout });
  }
}
