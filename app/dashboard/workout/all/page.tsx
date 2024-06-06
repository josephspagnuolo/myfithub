import { authOptions } from "@/app/api/auth/[...nextauth]/route";
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
    <main className="grow">
      <div className="w-full flex flex-col space-y-5 justify-center items-center px-4 py-4">
        <Link className="absolute top-4 flex overflow-y-clip z-50" href="/dashboard">
          <div className="sm:scale-y-[2] sm:scale-x-150 sm:-translate-y-[2.5px] sm:mr-0.5">←</div>
          <span>&nbsp;Back to dashboard</span>
        </Link>
        <div className="text-3xl font-medium text-left w-full max-w-5xl pb-2.5">All Workouts</div>
        {workouts.length === 0 ? (
          <span className="text-zinc-400 text-sm">
            Nothing so far...
          </span>
        ) : (
          <>
            {workouts.reverse().map((workout) => (
              <Link key={workout.id} className="w-full max-w-md sm:max-w-5xl rounded-2xl" href={`/dashboard/workout/${workout.id}`}>
                <div className="w-full max-w-md sm:max-w-5xl overflow-hidden rounded-2xl shadow-xl bg-[#1a1a1c] hover:bg-opacity-60 flex flex-col space-y-3 px-4 py-4 sm:px-[67px]">
                  {workout.content}{' '}
                  <span className="text-zinc-400 text-sm">
                    {workout.createdAt.toLocaleString('en-US', { timeZone: 'America/New_York', dateStyle: 'medium', timeStyle: 'short' })}
                  </span>
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
    </main>
  );
}
