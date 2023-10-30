import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: Request,
  {
    params,
  }: {
    params: { id: string }
  }
) {
  const { id } = params
  const session = await getServerSession();
  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ error: "Not Authenticated" }, { status: 400 });
  }
  const { name } = await req.json();
  const workout = await prisma.workout.findUnique({
    where: {
      id,
    },
  });
  if (workout) {
    const exercise = await prisma.exercise.create({
      data: {
        name,
        workoutId: id,
      },
    });
    //console.log(workout)
    return NextResponse.json({ exercise: exercise });
  }
}
