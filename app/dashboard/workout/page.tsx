import CreateWorkout from "@/components/create-workout";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import CopyWorkout from "@/components/copy-workout";

export default async function NewWorkout() {
  const session = await getServerSession(authOptions);
  const userId = session!.user!.id;
  const workouts = await prisma.workout.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  });
  return (
    <main className="flex grow justify-center">
      <div className="flex w-full max-w-5xl grow flex-col items-center justify-center space-y-3 p-4">
        <CreateWorkout />
        <span>or</span>
        <CopyWorkout workouts={workouts} />
      </div>
    </main>
  );
}
