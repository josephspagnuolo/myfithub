import { authOptions } from "@/app/api/auth/[...nextauth]/route";
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
    }
  });
  return (
    <main className="flex flex-col grow">
      <div className="flex flex-col w-full grow space-y-5 items-center p-4">
        <span className="text-3xl font-medium text-left w-full max-w-[950px] pb-2.5">Your Workouts</span>
        {workouts.length === 0 ? (
          <div className="flex grow items-center">
            <span className="text-zinc-400 text-sm">
              No workouts so far...
            </span>
          </div>
        ) : (
          <>
            {workouts.sort((a, b) => a.createdAt.valueOf() - b.createdAt.valueOf()).reverse().map((workout) => (
              <div key={workout.id} className="w-full max-w-[950px] rounded-2xl border border-zinc-800 shadow-xl bg-stone-900 flex justify-between p-6">
                <div className="flex flex-col">
                  <div>
                    <Link className="hover:underline" href={`/dashboard/workout/${workout.id}`}>
                      {workout.content}
                    </Link>
                  </div>
                  <span className="text-zinc-400 text-sm">
                    {workout.createdAt.toLocaleString('en-US', { timeZone: 'America/New_York', dateStyle: 'medium', timeStyle: 'short' })}
                  </span>
                </div>
                <div className="flex justify-center items-center">
                  <WorkoutMenuButton id={workout.id} title={workout.content} />
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </main>
  );
}
