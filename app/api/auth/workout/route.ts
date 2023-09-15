import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ error: "Not Authenticated" }, { status: 400 });
  }
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
    console.log(session.user.name)
    return NextResponse.json(workout);
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const session = await getServerSession();
    if (!session || !session.user || !session.user.email) {
      console.log("test")
      return NextResponse.json({ error: "Not Authenticated" }, { status: 400 });
    }
    const email = session.user.email;
    const workouts = await prisma.workout.findMany({
      where: {
        userEmail: email + "",
      }
    });
    return NextResponse.json({ message: "Success nice work", workouts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
