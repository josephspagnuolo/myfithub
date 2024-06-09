import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import ActivityCalendar from "./activity-calendar";
import Link from "next/link";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProgressChart from "./progress-chart";

export default async function ShowWorkouts() {
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
    <>
      <div className="w-full max-w-md sm:max-w-5xl overflow-hidden rounded-2xl shadow-xl bg-[#1a1a1c] flex flex-col space-y-3 px-4 py-4 sm:px-[67px]">
        <div>Recent Activity</div>
        <ActivityCalendar workouts={workouts} />
      </div>
      <div className="flex flex-col md:flex-row w-full max-w-md sm:max-w-5xl md:space-x-5 space-y-5 md:space-y-0">
        <div className="w-full max-w-md sm:max-w-5xl overflow-hidden rounded-2xl shadow-xl bg-[#1a1a1c] flex flex-col space-y-3 sm:space-y-5 px-4 py-4 sm:px-[67px] min-h-[250px]">
          <div className="flex justify-between">
            <div>Your Workouts</div>
            {workouts.length > 0 && <div>
              <Link className="text-sky-600 hover:text-sky-700 flex overflow-y-clip"
                href="/dashboard/workout/all">View All&nbsp;
                <div className="sm:scale-y-[2] sm:scale-x-150 sm:-translate-y-[2.5px] sm:ml-0.5">→</div>
              </Link>
            </div>}
          </div>
          {workouts.length === 0 ? (
            <span className="text-zinc-400 text-sm">
              Nothing so far...
            </span>
          ) : (
            <ul className="flex grow flex-col space-y-[3px]">
              {workouts.reverse().slice(0, 8).map((workout) => (
                <li className="line-clamp-1" key={workout.id}>
                  <Link className="hover:underline w-[250px] truncate" href={`/dashboard/workout/${workout.id}`}>
                    <span className="text-base">{workout.content}</span>
                  </Link>
                  <span className="text-zinc-400 text-sm pl-1.5">
                    {workout.createdAt.toLocaleString('en-US', { timeZone: 'America/New_York', dateStyle: 'medium', timeStyle: 'short' })}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="w-full max-w-md sm:max-w-5xl overflow-hidden rounded-2xl shadow-xl bg-[#1a1a1c] flex flex-col space-y-3 sm:space-y-5 px-4 py-4 sm:px-[67px] min-h-[250px]">
          <div>Your Progress</div>
          {/* <ProgressChart /> */}
        </div>
      </div>
    </>
  );
}

