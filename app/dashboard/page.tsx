import Link from "next/link";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import ActivityCalendar from "@/components/activity-calendar";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { formatTime } from "@/lib/utils";

export default async function Dashboard() {
  return (
    <main className="flex flex-col grow">
      <div className="flex flex-col w-full grow space-y-5 items-center p-4">
        <div className="flex justify-between w-full max-w-[950px] items-center mb-2.5">
          <div className="text-3xl font-medium">Dashboard</div>
          <Link href="/dashboard/workout" className="bg-sky-600 hover:bg-sky-700 border border-black h-10 px-6 flex items-center justify-center rounded-md text-md font-semibold transition-all">
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
    }
  });
  const exercises = workouts.map(w => w.exercises).filter(exs => exs.length != 0).flat();
  type GroupedExercise = {
    id: string[];
    name: string;
  };
  const groupedExercises: GroupedExercise[] = exercises.reduce<GroupedExercise[]>((acc, exercise) => {
    const existing = acc.find(item => item.name === exercise.name);
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
    groupedExercises.map(async ge => {
      const groupedExsWithSets = await prisma.exercise.findMany({
        where: {
          id: { in: ge.id },
        },
        select: {
          id: true,
          name: true,
          sets: true,
          createdAt: true,
        }
      });
      const nonEmpty = groupedExsWithSets
        .filter((groupedExsWithSets) => groupedExsWithSets.sets.length != 0)
        .sort((a, b) => a.createdAt.valueOf() - b.createdAt.valueOf());
      if (nonEmpty.length === 0) return null;
      return nonEmpty;
    })
  );
  const filtered = filteredSets.filter(ex => ex !== null);
  return (
    <>
      <div className="w-full max-w-[950px] overflow-hidden rounded-2xl border border-zinc-800 shadow-xl bg-stone-900 flex flex-col space-y-3 sm:space-y-5 p-6 pt-5">
        <div className="flex flex-col mb-2">
          <span className="text-lg font-semibold">Recent Activity</span>
          <span className="text-zinc-400 text-sm">An overview of your workout activity for the past year.</span>
        </div>
        <ActivityCalendar workouts={workouts} />
      </div>
      <div className="flex flex-col md:flex-row w-full max-w-[950px] md:space-x-5 space-y-5 md:space-y-0">
        <div className="w-full max-w-[950px] overflow-hidden rounded-2xl border border-zinc-800 shadow-xl bg-stone-900 flex flex-col space-y-3 sm:space-y-5 p-6 pt-5 min-h-[250px]">
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Your Workouts</span>
              {workouts.length > 0 &&
                <Link className="text-sky-500 hover:text-sky-600 transition-all"
                  href="/dashboard/workout/all">
                  <span>View All</span>
                </Link>
              }
            </div>
            <span className="text-zinc-400 text-sm">A list of your last five recorded workouts.</span>
          </div>
          {workouts.length === 0 ? (
            <div className="flex justify-center flex-col items-center h-full grow">
              <span className="text-zinc-400 text-sm text-center mb-2">
                Nothing so far...
              </span>
              <Link href="/dashboard/workout" className="bg-sky-600 hover:bg-sky-700 border border-black h-10 px-6 flex items-center justify-center rounded-md text-md font-semibold transition-all">
                <span>New Workout</span>
              </Link>
            </div>
          ) : (
            <ul className="flex flex-col rounded-md border border-zinc-800 overflow-clip divide-y divide-zinc-800">
              {workouts
                .sort((a, b) => a.createdAt.valueOf() - b.createdAt.valueOf())
                .reverse()
                .slice(0, 5)
                .map((workout) => (
                  <Link
                    key={workout.id}
                    href={`/dashboard/workout/${workout.id}`}
                  >
                    <li className="flex justify-between items-center w-full hover:bg-zinc-800 transition-all p-4">
                      <div className="flex items-center truncate">
                        <span className="truncate">
                          {workout.content}
                        </span>
                      </div>
                      <span className="text-zinc-400 text-sm whitespace-nowrap">
                        {workout.createdAt.toLocaleString('en-US', {
                          timeZone: 'America/New_York',
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })}
                      </span>
                    </li>
                  </Link>
                ))}
            </ul>
          )}
        </div>
        <div className="w-full max-w-[950px] overflow-hidden rounded-2xl border border-zinc-800 shadow-xl bg-stone-900 flex flex-col space-y-3 sm:space-y-5 p-6 pt-5 min-h-[250px]">
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Your Progress</span>
              {workouts.length > 0 && <div>
                <Link className="text-sky-500 hover:text-sky-600 transition-all"
                  href="/dashboard/progress">
                  <span>View All</span>
                </Link>
              </div>}
            </div>
            <span className="text-zinc-400 text-sm">A look at how much you have improved.</span>
          </div>
          {filtered.length === 0 ? (
            <div className="flex justify-center flex-col items-center h-full grow">
              <span className="text-zinc-400 text-sm text-center">
                Start tracking to see...
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-2 rounded-md border border-zinc-800 overflow-clip">
              {filtered.slice(0, 4).map((topEx, index) => (
                <TopExercise key={index} index={index} numberOfExs={filtered.length} topEx={topEx} />
              ))}
            </div>
          )}
        </div>
      </div >
    </>
  );
}

async function TopExercise({
  index, numberOfExs, topEx
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
    const weights = exercise.sets.map(set => parseFloat(set.weight ?? '0')).filter(weight => !isNaN(weight));
    return Math.max(0, ...weights);
  });
  const repsData = topEx.map((exercise) => {
    const reps = exercise.sets.map(set => parseFloat(set.reps ?? '0')).filter(reps => !isNaN(reps));
    return Math.max(0, ...reps);
  });
  const timeData = topEx.map((exercise) => {
    const times = exercise.sets.map(set => {
      const hours = !isNaN(parseFloat(set.timehrs ?? '0')) ? parseFloat(set.timehrs ?? '0') * 3600 : 0;
      const minutes = !isNaN(parseFloat(set.timemins ?? '0')) ? parseFloat(set.timemins ?? '0') * 60 : 0;
      const seconds = !isNaN(parseFloat(set.timeseconds ?? '0')) ? parseFloat(set.timeseconds ?? '0') : 0;
      return hours + minutes + seconds;
    }).filter(time => !isNaN(time));
    return Math.max(0, ...times);
  });
  const exerciseType = weightData.some(d => d > 0) ? "Weight" : repsData.some(d => d > 0) ? "Reps" : timeData.some(d => d > 0) ? "Time" : "N/A";
  const isTimeDecreaseBetter = topEx[0].name.includes("Distance Run");
  const personalBest = exerciseType === "Weight" ? Math.max(...weightData) : exerciseType === "Reps" ? Math.max(...repsData) : isTimeDecreaseBetter ? Math.min(...timeData) : Math.max(...timeData);
  const unitsForPR = exerciseType === "Weight" ? " lbs" : exerciseType === "Reps" ? " reps" : exerciseType === "Time" ? (isTimeDecreaseBetter ? formatTime(Math.min(...timeData)) : formatTime(Math.max(...timeData))) : "N/A";
  const earliest = exerciseType === "Weight" ? weightData[0] : exerciseType === "Reps" ? repsData[0] : exerciseType === "Time" ? timeData[0] : 0;
  const improvementPercentage = earliest > 0 ? ((personalBest - earliest) / earliest) * 100 : 0;
  const borderClasses = [
    numberOfExs === 3 ? "border-r border-b" : "border-r",
    numberOfExs === 3 ? "border-b" : "",
    numberOfExs === 3 ? "border-r" : "border-t border-r",
    "border-t"
  ][index] || "";
  return (
    <a href={`/dashboard/progress#${topEx[0].name.toLowerCase().replaceAll(" ", "")}`} className={`flex flex-col p-4 ${borderClasses} border-zinc-800 h-[136.25px] hover:bg-zinc-800 transition-all`}>
      <span className="mb-3">{topEx[0].name}</span>
      <span className="text-green-500 text-xl font-bold">PR: {personalBest > 0 && exerciseType !== "Time" ? personalBest : ""}{unitsForPR}</span>
      <span className="text-zinc-400 text-sm leading-tight">
        {improvementPercentage >= 0 ? "+" : ""}
        {improvementPercentage.toFixed(1)}% all time
      </span>
    </a>
  );
}
