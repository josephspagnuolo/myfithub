import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request, {
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id)
    return NextResponse.json({ error: "Not Authenticated" }, { status: 400 });

  const { reps, weight, timehrs, timemins, timeseconds } = await req.json();
  const exercise = await prisma.exercise.findUnique({
    where: {
      id,
    },
  });
  if (exercise) {
    const exerciseSet = await prisma.exerciseSet.create({
      data: {
        reps,
        weight,
        timehrs,
        timemins,
        timeseconds,
        exerciseId: id,
      },
    });
    return NextResponse.json({ exerciseSet: exerciseSet });
  }
}
