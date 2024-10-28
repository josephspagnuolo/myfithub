import ClosingButton from "@/components/closingbutton";
import DeleteExerciseButton from "@/components/delete-exercise";
import PastExercisesButton from "@/components/past-exercises-button";
import prisma from "@/lib/prisma";
import ExerciseMenuButton from "./exercise-menu-button";

export default async function ExpandableExerciseBox({
  ex,
  defaultChecked,
  pastExs,
}: {
  ex: {
    id: string;
    workoutId: string;
    name: string;
    notes: string | null;
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
  return (
    <>
      <div className="flex justify-between">
        <div className="mb-2 flex flex-col -space-y-0.5">
          <span className="text-lg font-semibold">{ex.name}</span>
          <span className="text-sm text-zinc-400">
            {ex.notes || "No additional notes"}
          </span>
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
