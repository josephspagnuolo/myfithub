import ClosingButton from "./closingbutton";
import DeleteExerciseButton from "./delete-exercise";
import PastExercisesButton from "./past-exercises-button";
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
      <span className="flex justify-between">
        <div>
          {ex.name}
        </div>
        <div className="flex flex-row space-x-2">
          <PastExercisesButton name={ex.name} pastExsWithSets={pastExsWithSets.reverse()} />
          <ClosingButton id={ex.id} defaultChecked={defaultChecked} />
          <DeleteExerciseButton id={ex.id} />
        </div>
      </span>
    </>
  );
}