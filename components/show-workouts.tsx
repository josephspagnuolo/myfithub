import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import WorkoutList from "./workoutlist";

export default async function ShowWorkouts() {
  const session = await getServerSession();
  const useremail = session!.user!.email + "";
  const workouts = await prisma.workout.findMany({
    where: {
      userEmail: useremail,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
    }
  })
  return (
    <>
      <div className="z-10 w-full max-w-md sm:max-w-5xl overflow-hidden rounded-2xl shadow-xl bg-[#292929] flex flex-col space-y-3 px-4 py-4 sm:px-[75px]">
        <div>Recent Activity</div>
        <WorkoutList workouts={workouts} />
      </div>
      <div className="z-10 w-full max-w-md sm:max-w-5xl overflow-hidden rounded-2xl shadow-xl bg-[#292929] flex flex-col space-y-3 px-4 py-4 sm:px-[75px] min-h-[210px]">
        <div>Your Workouts</div>
        {workouts.length === 0 ? (
          <span className="text-stone-400 text-sm">
            Nothing so far...
          </span>
        ) : (
          <ul>
            {workouts.map((workout) => (
              <li className="break-words" key={workout.id} {...workout}>
                {workout.content}{' '}
                <span className="text-stone-400 text-sm">
                  {workout.createdAt.toLocaleString('en-US', { timeZone: 'America/New_York' })}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

