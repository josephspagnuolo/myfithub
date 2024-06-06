import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AddExercise from "@/components/add-exercise";
import AddSet from "@/components/add-set";
import ExpandableExerciseBox from "@/components/radio-expand-exercise";
import ShowSets from "@/components/show-sets";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import Link from "next/link";

export default async function WorkoutPage({
  params
}: {
  params: { id: string };
}) {
  const { id } = params;

  const session = await getServerSession(authOptions);

  const userId = session!.user!.id;

  const thisWorkout = await prisma.workout.findFirst({
    where: {
      userId,
      id: id,
    },
    select: {
      content: true,
      createdAt: true,
      exercises: true,
    }
  });

  const currentExsList = thisWorkout?.exercises.map(e => e.name) || [];

  return (
    <main className="grow">
      <div className="w-full flex flex-col space-y-5 justify-center items-center px-4 py-4">
        <Link className="absolute top-4 flex overflow-y-clip z-50" href="/dashboard">
          <div className="sm:scale-y-[2] sm:scale-x-150 sm:-translate-y-[2.5px] sm:mr-0.5">←</div>
          <span>&nbsp;Back to dashboard</span>
        </Link>
        {thisWorkout ? (
          <>
            <div className="flex flex-col w-full items-center">
              <div className="text-xl font-medium text-left w-full max-w-md sm:px-4 -translate-y-1 overflow-auto overflow-ellipsis">{thisWorkout.content}</div>
              <div className="text-left text-zinc-400 w-full max-w-md sm:px-4 leading-3">
                {thisWorkout.createdAt.toLocaleString('en-US', { timeZone: 'America/New_York', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
              </div>
            </div>
            <AddExercise id={id} currentExsList={currentExsList} />
            {thisWorkout.exercises.length === 0 ? (
              <span className="text-zinc-400 text-sm">
                No exercises so far...
              </span>
            ) : (
              <>
                <fieldset id="accordion" className="w-full max-w-md sm:max-w-5xl border-none overflow-hidden rounded-2xl space-y-5">
                  {thisWorkout.exercises.map((ex, index) => (
                    <label key={ex.id} className="w-full max-w-md sm:max-w-5xl overflow-hidden rounded-2xl shadow-xl bg-[#1a1a1c] flex flex-col px-4 py-4 sm:px-[67px]">
                      <ExpandableExerciseBox ex={ex} defaultChecked={index === 0} />
                      <div className="grid grid-rows-[0fr] transition-all ease-in-out duration-500 overflow-hidden pt-0 peer-checked:grid-rows-[1fr]">
                        <div className="overflow-hidden p-0 m-0">
                          <div className="h-4" />
                          <ShowSets id={ex.id} />
                          <AddSet id={ex.id} />
                        </div>
                      </div>
                    </label>
                  ))}
                </fieldset>
              </>
            )}
          </>
        ) : (
          <>
            <span className="text-zinc-400 text-sm">
              No workout to show here...
            </span>
          </>
        )}
      </div>
    </main>
  );
}