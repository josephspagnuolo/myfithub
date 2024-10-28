import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AddExercise from "@/components/add-exercise";
import AddSet from "@/components/add-set";
import Card from "@/components/card";
import ExpandableExerciseBox from "@/components/radio-expand-exercise";
import ShowSets from "@/components/show-sets";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";

export default async function WorkoutPage({
  params,
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
    },
  });

  const currentExsList = thisWorkout?.exercises.map((e) => e.name) || [];

  const workouts = await prisma.workout.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
      exercises: true,
    },
  });
  const exercises = workouts
    .map((w) => w.exercises)
    .filter((exs) => exs.length != 0)
    .flat();

  return (
    <main className="flex grow justify-center">
      <div className="flex w-full max-w-5xl grow flex-col items-center space-y-5 px-4 py-4">
        {thisWorkout ? (
          <>
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col">
                <span className="w-full overflow-auto overflow-ellipsis text-left text-lg font-semibold">
                  {thisWorkout.content}
                </span>
                <span className="w-full text-left text-sm leading-tight text-zinc-400">
                  {thisWorkout.createdAt.toLocaleString("en-US", {
                    timeZone: "America/New_York",
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </span>
              </div>
              <AddExercise id={id} currentExsList={currentExsList} />
            </div>
            {thisWorkout.exercises.length === 0 ? (
              <div className="flex grow items-center">
                <span className="text-sm text-zinc-400">
                  No exercises so far...
                </span>
              </div>
            ) : (
              <>
                <fieldset id="accordion" className="w-full space-y-5">
                  {thisWorkout.exercises
                    .sort(
                      (a, b) => a.createdAt.valueOf() - b.createdAt.valueOf(),
                    )
                    .map((ex, index) => (
                      <Card key={ex.id}>
                        <ExpandableExerciseBox
                          ex={ex}
                          defaultChecked={
                            index === thisWorkout.exercises.length - 1
                          }
                          pastExs={exercises.filter(
                            (pastEx) =>
                              pastEx.name === ex.name &&
                              pastEx.id !== ex.id &&
                              pastEx.createdAt < ex.createdAt,
                          )}
                        />
                        <ShowSets id={ex.id} />
                        <div className="invisible grid grid-rows-[0fr] overflow-hidden transition-all duration-500 ease-in-out peer-checked:visible peer-checked:grid-rows-[1fr]">
                          <div className="overflow-hidden">
                            <AddSet id={ex.id} />
                          </div>
                        </div>
                      </Card>
                    ))}
                </fieldset>
              </>
            )}
          </>
        ) : (
          <>
            <span className="text-sm text-zinc-400">
              No workout to show here...
            </span>
          </>
        )}
      </div>
    </main>
  );
}
