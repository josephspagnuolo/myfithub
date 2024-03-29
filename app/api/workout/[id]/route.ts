import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: Request, {
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id)
    return NextResponse.json({ error: "Not Authenticated" }, { status: 400 });

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
    return NextResponse.json({ exercise: exercise });
  }
}
