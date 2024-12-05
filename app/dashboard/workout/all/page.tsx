import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Card from "@/components/card";
import WorkoutMenuButton from "@/components/workout-menu-button";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import Link from "next/link";

export default async function AllWorkouts() {
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
      <div className="flex w-full max-w-5xl grow flex-col items-center space-y-5 p-4">
        <span className="w-full pb-2.5 text-left text-3xl font-medium">
          Your Workouts
        </span>
        {workouts.length === 0 ? (
          <div className="flex h-full grow flex-col items-center justify-center pb-3">
            <span className="mb-2 text-center text-sm text-zinc-400">
              Nothing so far...
            </span>
            <Link
              href="/dashboard/workout"
              className="text-md flex h-10 items-center justify-center rounded-md border border-black bg-sky-600 px-6 font-semibold transition-all hover:bg-sky-700"
            >
              <span>New Workout</span>
            </Link>
          </div>
        ) : (
          <>
            {workouts
              .sort((a, b) => a.createdAt.valueOf() - b.createdAt.valueOf())
              .reverse()
              .map((workout) => (
                <Card key={workout.id}>
                  <div className="flex justify-between">
                    <div className="flex flex-col -space-y-0.5">
                      <span className="text-lg font-semibold">
                        <Link
                          className="hover:underline"
                          href={`/dashboard/workout/${workout.id}`}
                        >
                          {workout.content}
                        </Link>
                      </span>
                      <span className="text-sm text-zinc-400">
                        {workout.createdAt.toLocaleString("en-US", {
                          timeZone: "America/New_York",
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center justify-center">
                      <WorkoutMenuButton
                        id={workout.id}
                        title={workout.content}
                      />
                    </div>
                  </div>
                </Card>
              ))}
          </>
        )}
      </div>
    </main>
  );
}
