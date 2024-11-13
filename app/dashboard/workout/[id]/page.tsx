import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AddExercise from "@/components/add-exercise";
import AddSet from "@/components/add-set";
import Card from "@/components/card";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import ClosingButton from "@/components/closingbutton";
import ExerciseMenuButton from "@/components/exercise-menu-button";

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
  const allExercises = allWorkouts
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
                        <ExerciseBox
                          id={ex.id}
                          index={index}
                          currentExsList={currentExsList}
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
  id,
  index,
  currentExsList,
  allExercises,
}: {
  id: string;
  index: number;
  currentExsList: string[];
  allExercises: {
    id: string;
    workoutId: string;
    name: string;
    notes: string | null;
    createdAt: Date;
  }[];
}) {
  const thisExercise = await prisma.exercise.findFirst({
    where: {
      id: id,
    },
    select: {
      id: true,
      workoutId: true,
      name: true,
      notes: true,
      sets: true,
      createdAt: true,
    },
  });
  if (!thisExercise) return null;
  return (
    <div className="space-y-0">
      <ExpandableExerciseBox
        ex={thisExercise}
        defaultChecked={index === currentExsList.length - 1}
        pastExs={allExercises.filter(
          (pastEx) =>
            pastEx.name === thisExercise.name &&
            pastEx.id !== thisExercise.id &&
            pastEx.createdAt < thisExercise.createdAt,
        )}
      />
      <ShowSets sets={thisExercise.sets} />
      <div className="invisible grid grid-rows-[0fr] overflow-hidden transition-all duration-500 ease-in-out peer-checked:visible peer-checked:grid-rows-[1fr]">
        <div className="overflow-hidden">
          {thisExercise.sets.length === 0 && <div className="h-2"></div>}
          <AddSet id={id} />
        </div>
      </div>
    </div>
  );
}

async function ExpandableExerciseBox({
  ex,
  defaultChecked,
  pastExs,
}: {
  ex: {
    id: string;
    workoutId: string;
    name: string;
    notes: string | null;
    sets: {
      id: string;
      exerciseId: string;
      reps: string | null;
      weight: string | null;
      timehrs: string | null;
      timemins: string | null;
      timeseconds: string | null;
      createdAt: Date;
    }[];
    createdAt: Date;
  };
  defaultChecked: boolean;
  pastExs: {
    id: string;
    workoutId: string;
    name: string;
    createdAt: Date;
  }[];
}) {
  const pastExsWithSets = await prisma.exercise.findMany({
    where: {
      id: { in: pastExs.map((pastEx) => pastEx.id) },
    },
    select: {
      name: true,
      sets: true,
      createdAt: true,
    },
  });
  const subheading =
    ex.sets.length === 0
      ? `No sets • ${ex.notes || "No additional notes"}`
      : ex.sets.length === 1
        ? `1 set • ${ex.notes || "No additional notes"}`
        : `${ex.sets.length} sets • ${ex.notes || "No additional notes"}`;
  return (
    <>
      <div className="flex justify-between">
        <div className="mb-0.5 flex flex-col -space-y-0.5">
          <span className="text-lg font-semibold">{ex.name}</span>
          <span className="text-sm text-zinc-400">{subheading}</span>
        </div>
        <div className="flex flex-row">
          <ClosingButton id={ex.id} defaultChecked={defaultChecked} />
          <ExerciseMenuButton
            id={ex.id}
            name={ex.name}
            notes={ex.notes || ""}
            pastExsWithSets={pastExsWithSets.sort(
              (a, b) => b.createdAt.valueOf() - a.createdAt.valueOf(),
            )}
          />
        </div>
      </div>
      <input
        id={ex.id}
        type="checkbox"
        disabled
        value="bar1"
        name="accordion"
        className="peer hidden"
        defaultChecked={defaultChecked}
      />
    </>
  );
}

function ShowSets({
  sets,
}: {
  sets: {
    id: string;
    exerciseId: string;
    reps: string | null;
    weight: string | null;
    timehrs: string | null;
    timemins: string | null;
    timeseconds: string | null;
    createdAt: Date;
  }[];
}) {
  function getSetString1(set: {
    id: string;
    exerciseId: string;
    reps: string | null;
    weight: string | null;
    timehrs: string | null;
    timemins: string | null;
    timeseconds: string | null;
    createdAt: Date;
  }) {
    return set.reps !== "" && set.weight !== ""
      ? Number(set.reps) === 1
        ? `${set.reps} rep of ${set.weight} lbs`
        : `${set.reps} reps of ${set.weight} lbs`
      : set.reps !== ""
        ? Number(set.reps) === 1
          ? `${set.reps} rep`
          : `${set.reps} reps`
        : set.weight !== ""
          ? `${set.weight} lbs`
          : "";
  }

  function getSetString2(set: {
    id: string;
    exerciseId: string;
    reps: string | null;
    weight: string | null;
    timehrs: string | null;
    timemins: string | null;
    timeseconds: string | null;
    createdAt: Date;
  }) {
    return set.timehrs !== "" && set.timemins !== "" && set.timeseconds !== ""
      ? `${set.timehrs}hr ${set.timemins}min ${set.timeseconds}s`
      : set.timehrs !== "" && set.timemins !== ""
        ? `${set.timehrs}hr and ${set.timemins}min`
        : set.timehrs !== "" && set.timeseconds !== ""
          ? `${set.timehrs}hr and ${set.timeseconds}s`
          : set.timemins !== "" && set.timeseconds !== ""
            ? `${set.timemins}min and ${set.timeseconds}s`
            : set.timehrs !== ""
              ? Number(set.timehrs) === 1
                ? `${set.timehrs} hour`
                : `${set.timehrs} hours`
              : set.timemins !== ""
                ? Number(set.timemins) === 1
                  ? `${set.timemins} minute`
                  : `${set.timemins} minutes`
                : set.timeseconds !== ""
                  ? Number(set.timeseconds) === 1
                    ? `${set.timeseconds} second`
                    : `${set.timeseconds} seconds`
                  : "";
  }
  if (sets.length === 0) return null;
  return (
    <>
      <div className="flex w-full flex-col overflow-hidden pt-3">
        <ul className="flex grow flex-col divide-y-[1px] divide-zinc-800">
          {sets.map((set, idx) => (
            <li className="pb-1 pl-[3.9em] pt-0.5 -indent-[3.9em]" key={set.id}>
              <span className="pr-1 text-2xl font-light text-zinc-400">
                Set {idx + 1}:&nbsp;
              </span>
              {getSetString1(set) === "" ? (
                <span className="text-2xl">{getSetString2(set)}</span>
              ) : (
                ""
              )}
              {getSetString2(set) === "" ? (
                <span className="text-2xl">{getSetString1(set)}</span>
              ) : (
                ""
              )}
              {getSetString1(set) !== "" && getSetString2(set) !== "" ? (
                <span className="text-2xl">
                  {getSetString1(set)}
                  {", "}
                  <br className="sm:hidden" />
                  {getSetString2(set)}
                </span>
              ) : (
                ""
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
