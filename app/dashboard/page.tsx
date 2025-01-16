import Link from "next/link";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import ActivityCalendar from "@/components/activity-calendar";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { formatTime } from "@/lib/utils";
import Card from "@/components/card";

export default async function Dashboard() {
  return (
    <main className="flex grow justify-center">
      <div className="flex w-full max-w-5xl grow flex-col items-center space-y-5 p-4">
        <div className="mb-2.5 flex w-full items-center justify-between">
          <div className="text-3xl font-medium">Dashboard</div>
          <Link
            href="/dashboard/workout"
            className="text-md flex h-10 items-center justify-center rounded-md border border-black bg-sky-600 px-6 font-semibold transition-all hover:bg-sky-700"
          >
            <span>New Workout</span>
          </Link>
        </div>
        <DashboardCards />
      </div>
    </main>
  );
}

async function DashboardCards() {
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
  const filteredSets = await Promise.all(
    groupedExercises.map(async (ge) => {
      const groupedExsWithSets = await prisma.exercise.findMany({
        where: {
          id: { in: ge.id },
        },
        select: {
          id: true,
          name: true,
          sets: true,
          createdAt: true,
        },
      });
      const nonEmpty = groupedExsWithSets
        .filter((groupedExsWithSets) => groupedExsWithSets.sets.length != 0)
        .sort((a, b) => a.createdAt.valueOf() - b.createdAt.valueOf());
      if (nonEmpty.length === 0) return null;
      return nonEmpty;
    }),
  );
  const filtered = filteredSets.filter((ex) => ex !== null);
  return (
    <>
      <Card>
        <div className="mb-2 flex flex-col -space-y-0.5">
          <span className="text-lg font-semibold">Recent Activity</span>
          <span className="text-sm text-zinc-400">
            An overview of your workout activity for the past year.
          </span>
        </div>
        <ActivityCalendar workouts={workouts} />
      </Card>
      <div className="flex w-full flex-col space-y-5 md:flex-row md:space-x-5 md:space-y-0">
        <Card>
          <div className="mb-2 flex flex-col -space-y-0.5">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Your Workouts</span>
              {workouts.length > 0 && (
                <Link
                  className="text-sky-500 transition-all hover:text-sky-600"
                  href="/dashboard/workout/all"
                >
                  <span>View All</span>
                </Link>
              )}
            </div>
            <span className="text-sm text-zinc-400">
              A list of your last five recorded workouts.
            </span>
          </div>
          {workouts.length === 0 ? (
            <div className="flex h-full grow flex-col items-center justify-center pb-3">
              <span className="mb-2 text-center text-sm text-zinc-400">
                Nothing so far...
              </span>
              <Link
                href="/dashboard/workout"
                className="text-md flex h-10 items-center justify-center rounded-md border border-black bg-sky-600 px-6 font-semibold transition-all hover:bg-sky-700"
              >
                <span>New Workout</span>
              </Link>
            </div>
          ) : (
            <ul className="flex flex-col">
              {workouts
                .sort((a, b) => a.createdAt.valueOf() - b.createdAt.valueOf())
                .reverse()
                .slice(0, 5)
                .map((workout, index) => (
                  <Link
                    key={workout.id}
                    href={`/dashboard/workout/${workout.id}`}
                    className={`${index === 0 ? "rounded-t-md border-t" : ""} ${index === workouts.slice(0, 5).length - 1 ? "rounded-b-md" : ""} flex w-full items-center justify-between space-x-1.5 border-x border-b border-zinc-800 p-4 transition-all hover:bg-zinc-800 focus:z-10`}
                  >
                    <div className="flex items-center truncate">
                      <span className="truncate">{workout.content}</span>
                    </div>
                    <span className="whitespace-nowrap text-sm text-zinc-400">
                      {workout.createdAt.toLocaleString("en-US", {
                        timeZone: "America/New_York",
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  </Link>
                ))}
            </ul>
          )}
        </Card>
        <Card>
          <div className="mb-2 flex flex-col -space-y-0.5">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Your Progress</span>
              {filtered.length > 0 && (
                <div>
                  <Link
                    className="text-sky-500 transition-all hover:text-sky-600"
                    href="/dashboard/progress"
                  >
                    <span>View All</span>
                  </Link>
                </div>
              )}
            </div>
            <span className="text-sm text-zinc-400">
              A look at how much you have improved.
            </span>
          </div>
          {filtered.length === 0 ? (
            <div className="flex h-full grow flex-col items-center justify-center pb-3">
              <span className="text-center text-sm text-zinc-400">
                Start tracking to see...
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-2">
              {filtered.slice(0, 4).map((topEx, index) => (
                <TopExercise
                  key={index}
                  index={index}
                  numberOfExs={filtered.slice(0, 4).length}
                  topEx={topEx}
                />
              ))}
              {filtered.slice(0, 4).length === 1 && (
                <div className="rounded-r-md border-y border-r border-zinc-800"></div>
              )}
              {filtered.slice(0, 4).length === 3 && (
                <div className="rounded-br-md border-b border-r border-zinc-800"></div>
              )}
            </div>
          )}
        </Card>
      </div>
    </>
  );
}

async function TopExercise({
  index,
  numberOfExs,
  topEx,
}: {
  index: number;
  numberOfExs: number;
  topEx: {
    id: string;
    createdAt: Date;
    name: string;
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
  }[];
}) {
  const weightData = topEx.map((exercise) => {
    const weights = exercise.sets
      .map((set) => parseFloat(set.weight ?? "0"))
      .filter((weight) => !isNaN(weight));
    return Math.max(0, ...weights);
  });
  const repsData = topEx.map((exercise) => {
    const reps = exercise.sets
      .map((set) => parseFloat(set.reps ?? "0"))
      .filter((reps) => !isNaN(reps));
    return Math.max(0, ...reps);
  });
  const timeData = topEx.map((exercise) => {
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
    return Math.max(0, ...times);
  });
  const exerciseType = weightData.some((d) => d > 0)
    ? "Weight"
    : repsData.some((d) => d > 0)
      ? "Reps"
      : timeData.some((d) => d > 0)
        ? "Time"
        : "N/A";
  const isTimeDecreaseBetter = topEx[0].name.includes("Distance Run");
  const personalBest =
    exerciseType === "Weight"
      ? Math.max(...weightData)
      : exerciseType === "Reps"
        ? Math.max(...repsData)
        : isTimeDecreaseBetter
          ? Math.min(...timeData)
          : Math.max(...timeData);
  const unitsForPR =
    exerciseType === "Weight"
      ? " lbs"
      : exerciseType === "Reps"
        ? " reps"
        : exerciseType === "Time"
          ? isTimeDecreaseBetter
            ? formatTime(Math.min(...timeData))
            : formatTime(Math.max(...timeData))
          : "N/A";
  const earliest =
    exerciseType === "Weight"
      ? weightData[0]
      : exerciseType === "Reps"
        ? repsData[0]
        : exerciseType === "Time"
          ? timeData[0]
          : 0;
  const improvementPercentage =
    earliest > 0 ? ((personalBest - earliest) / earliest) * 100 : 0;
  const borderClasses =
    [
      numberOfExs === 3 ? "border-r border-b" : "border-r",
      numberOfExs === 3 ? "border-b" : "",
      numberOfExs === 3 ? "border-r" : "border-t border-r",
      "border-t",
    ][index] || "";
  const roundedClasses =
    [
      numberOfExs > 2
        ? "rounded-tl-md border-t border-l"
        : "rounded-l-md border-y border-l",
      numberOfExs > 2
        ? "rounded-tr-md border-t border-r"
        : "rounded-r-md border-y border-r",
      "rounded-bl-md border-b border-l",
      "rounded-br-md border-b border-r",
    ][index] || "";
  return (
    <a
      href={`/dashboard/progress#${topEx[0].name.toLowerCase().replaceAll(" ", "")}`}
      className={`flex flex-col p-4 ${borderClasses} ${roundedClasses} h-[136.25px] border-zinc-800 transition-all hover:bg-zinc-800 focus:z-10`}
    >
      <span className="mb-3">{topEx[0].name}</span>
      <span className="text-xl font-bold text-green-500">
        PR: {personalBest > 0 && exerciseType !== "Time" ? personalBest : ""}
        {unitsForPR}
      </span>
      <span className="text-sm leading-tight text-zinc-400">
        {improvementPercentage >= 0 ? "+" : ""}
        {improvementPercentage.toFixed(1)}% all time
      </span>
    </a>
  );
}
