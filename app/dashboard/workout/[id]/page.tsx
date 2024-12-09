import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AddExercise from "@/components/add-exercise";
import Card from "@/components/card";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import ExerciseComponent from "@/components/exercise";

export default async function WorkoutPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const session = await getServerSession(authOptions);

  const userId = session!.user!.id;

  const allWorkouts = await prisma.workout.findMany({
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

  const thisWorkout = allWorkouts.find((workout) => workout.id === id);

  const allExercises = allWorkouts
    .map((w) => w.exercises)
    .filter((exs) => exs.length != 0)
    .flat();

  const currentExsList = thisWorkout?.exercises.map((e) => e.name) || [];

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
                <fieldset className="w-full space-y-5">
                  {thisWorkout.exercises
                    .sort(
                      (a, b) => a.createdAt.valueOf() - b.createdAt.valueOf(),
                    )
                    .map((ex, index) => (
                      <Card key={ex.id}>
                        <ExerciseBox
                          exercise={ex}
                          allExercises={allExercises}
                        />
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

async function ExerciseBox({
  exercise,
  allExercises,
}: {
  exercise: {
    id: string;
    workoutId: string;
    name: string;
    notes: string | null;
    createdAt: Date;
  };
  allExercises: {
    id: string;
    workoutId: string;
    name: string;
    notes: string | null;
    createdAt: Date;
  }[];
}) {
  const sameExercises = allExercises.filter(
    (pastEx) => pastEx.name === exercise.name,
  );
  const sameExercisesWithSets = await prisma.exercise.findMany({
    where: {
      id: { in: sameExercises.map((sameEx) => sameEx.id) },
    },
    select: {
      id: true,
      name: true,
      notes: true,
      sets: true,
      createdAt: true,
    },
  });
  const thisExercise = sameExercisesWithSets.find(
    (ex) => ex.id === exercise.id,
  );
  if (!thisExercise) return null;
  const pastExercisesWithSets = sameExercisesWithSets.filter(
    (pastEx) =>
      pastEx.name === exercise.name &&
      pastEx.id !== exercise.id &&
      pastEx.createdAt < exercise.createdAt,
  );
  return (
    <ExerciseComponent
      thisExercise={thisExercise}
      pastExercisesWithSets={pastExercisesWithSets}
    />
  );
}
