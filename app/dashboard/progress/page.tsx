import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Card from "@/components/card";
import ProgressChart from "@/components/progress-chart";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";

export default async function AllProgress() {
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
      exercises: true,
    },
  });
  const exercises = workouts
    .map((w) => w.exercises)
    .filter((exs) => exs.length != 0)
    .flat();
  type GroupedExercise = {
    id: string[];
    name: string;
  };
  const groupedExercises: GroupedExercise[] = exercises.reduce<
    GroupedExercise[]
  >((acc, exercise) => {
    const existing = acc.find((item) => item.name === exercise.name);
    if (existing) {
      existing.id.push(exercise.id);
    } else {
      acc.push({
        id: [exercise.id],
        name: exercise.name,
      });
    }
    return acc;
  }, []);
  groupedExercises.sort((a, b) => b.id.length - a.id.length);
  return (
    <main className="flex grow justify-center">
      <div className="flex w-full max-w-5xl grow flex-col items-center space-y-5 p-4">
        <span className="w-full pb-2.5 text-left text-3xl font-medium">
          Your Progress
        </span>
        {exercises.length === 0 ? (
          <div className="flex grow items-center">
            <span className="text-sm text-zinc-400">Nothing so far...</span>
          </div>
        ) : (
          <>
            {groupedExercises.map((groupedEx) => (
              <ExerciseChartBox
                key={groupedEx.id.join("-")}
                groupedEx={groupedEx}
              />
            ))}
          </>
        )}
      </div>
    </main>
  );
}

async function ExerciseChartBox({
  groupedEx,
}: {
  groupedEx: {
    id: string[];
    name: string;
  };
}) {
  const groupedExsWithSets = await prisma.exercise.findMany({
    where: {
      id: { in: groupedEx.id },
    },
    select: {
      name: true,
      sets: true,
      createdAt: true,
    },
  });
  const filtered = groupedExsWithSets.filter(
    (groupedExsWithSets) => groupedExsWithSets.sets.length != 0,
  );
  filtered.sort((a, b) => a.createdAt.valueOf() - b.createdAt.valueOf());
  if (filtered.length === 0) return null;
  const data = filtered.map((exercise) => {
    const weights = exercise.sets
      .map((set) => parseFloat(set.weight ?? "0"))
      .filter((weight) => !isNaN(weight));
    const reps = exercise.sets
      .map((set) => parseFloat(set.reps ?? "0"))
      .filter((reps) => !isNaN(reps));
    const times = exercise.sets
      .map((set) => {
        const hours = !isNaN(parseFloat(set.timehrs ?? "0"))
          ? parseFloat(set.timehrs ?? "0") * 3600
          : 0;
        const minutes = !isNaN(parseFloat(set.timemins ?? "0"))
          ? parseFloat(set.timemins ?? "0") * 60
          : 0;
        const seconds = !isNaN(parseFloat(set.timeseconds ?? "0"))
          ? parseFloat(set.timeseconds ?? "0")
          : 0;
        return hours + minutes + seconds;
      })
      .filter((time) => !isNaN(time));
    return {
      Weight: Math.max(0, ...weights),
      Reps: Math.max(0, ...reps),
      Time: Math.max(0, ...times),
      date: exercise.createdAt.toLocaleDateString("en-US", {
        timeZone: "America/New_York",
        dateStyle: "short",
      }),
    };
  });
  const dataKey = () => {
    if (data.some((d) => d.Weight > 0)) return "Weight";
    if (data.some((d) => d.Reps > 0)) return "Reps";
    if (data.some((d) => d.Time > 0)) return "Time";
    return "";
  };
  return (
    <Card id={groupedEx.name.toLowerCase().replaceAll(" ", "")}>
      <div className="mb-2 flex flex-col -space-y-0.5">
        <span className="text-lg font-semibold">{groupedEx.name}</span>
        <span className="text-sm text-zinc-400">
          Based on your top set from each workout{" "}
        </span>
      </div>
      <ProgressChart data={data} dataKey={dataKey()} />
    </Card>
  );
}
