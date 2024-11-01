import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(
  req: Request,
  {
    params,
  }: {
    params: { id: string };
  },
) {
  const { id } = params;
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id)
    return NextResponse.json({ error: "Not Authenticated" }, { status: 400 });

  const { name, notes } = await req.json();
  const workout = await prisma.workout.findUnique({
    where: {
      id,
    },
    include: {
      exercises: true,
    },
  });
  if (workout) {
    const lastTime = workout.exercises
      .at(workout.exercises.length)
      ?.createdAt?.getTime();
    const exercise = await prisma.exercise.create({
      data: {
        name,
        notes,
        workoutId: id,
        createdAt: new Date(
          lastTime ? lastTime + 1 : workout.createdAt.getTime(),
        ),
      },
    });
    return NextResponse.json({ exercise: exercise });
  }
}
