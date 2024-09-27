import ClosingButton from "@/components/closingbutton";
import DeleteExerciseButton from "@/components/delete-exercise";
import PastExercisesButton from "@/components/past-exercises-button";
import prisma from "@/lib/prisma";

export default async function ExpandableExerciseBox({
  ex, defaultChecked, pastExs
}: {
  ex: {
    id: string;
    workoutId: string;
    name: string;
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
      id: { in: pastExs.map(pastEx => pastEx.id) },
    },
    select: {
      name: true,
      sets: true,
      createdAt: true,
    }
  });
  return (
    <>
      <input id={ex.id} type="checkbox" disabled value="bar1" name="accordion" className="peer hidden" defaultChecked={defaultChecked} />
      <div className="flex justify-between">
        <span>
          {ex.name}
        </span>
        <div className="flex flex-row space-x-2">
          <ClosingButton id={ex.id} defaultChecked={defaultChecked} />
          <PastExercisesButton name={ex.name} pastExsWithSets={pastExsWithSets.sort((a, b) => b.createdAt.valueOf() - a.createdAt.valueOf())} />
          <DeleteExerciseButton id={ex.id} />
        </div>
      </div>
    </>
  );
}