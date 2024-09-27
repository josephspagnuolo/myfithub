import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AddExercise from "@/components/add-exercise";
import AddSet from "@/components/add-set";
import ExpandableExerciseBox from "@/components/radio-expand-exercise";
import ShowSets from "@/components/show-sets";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";

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

  const workouts = await prisma.workout.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
      exercises: true,
    }
  });
  const exercises = workouts.map(w => w.exercises).filter(exs => exs.length != 0).flat();

  return (
    <main className="flex flex-col grow">
      <div className="flex flex-col w-full grow space-y-5 items-center px-4 py-4">
        {thisWorkout ? (
          <>
            <div className="flex justify-between w-full max-w-[950px] items-center">
              <div className="flex flex-col">
                <span className="text-lg font-bold text-left w-full overflow-auto overflow-ellipsis">{thisWorkout.content}</span>
                <span className="text-left text-zinc-400 text-sm w-full leading-tight">
                  {thisWorkout.createdAt.toLocaleString('en-US', { timeZone: 'America/New_York', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
                </span>
              </div>
              <AddExercise id={id} currentExsList={currentExsList} />
            </div>
            {thisWorkout.exercises.length === 0 ? (
              <div className="flex grow items-center">
                <span className="text-zinc-400 text-sm">
                  No exercises so far...
                </span>
              </div>
            ) : (
              <>
                <fieldset id="accordion" className="w-full max-w-[950px] overflow-hidden space-y-5">
                  {thisWorkout.exercises.map((ex, index) => (
                    <label key={ex.id} className="w-full max-w-[950px] overflow-hidden rounded-2xl border border-zinc-800 shadow-xl bg-stone-900 flex flex-col p-6">
                      <ExpandableExerciseBox ex={ex} defaultChecked={index === thisWorkout.exercises.length - 1} pastExs={exercises.filter(pastEx => pastEx.name === ex.name && pastEx.id !== ex.id && pastEx.createdAt < ex.createdAt)} />
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