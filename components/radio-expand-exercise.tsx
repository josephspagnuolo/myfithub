"use client";

import ClosingButton from "./closingbutton";
import DeleteExerciseButton from "./delete-exercise";

export default function ExpandableExerciseBox({
  ex, defaultChecked
}: {
  ex: {
    id: string;
    workoutId: string;
    name: string;
    createdAt: Date;
  };
  defaultChecked: boolean;
}) {
  return (
    <>
      <input id={ex.id} type="checkbox" disabled value="bar1" name="accordion" className="peer hidden" defaultChecked={defaultChecked} />
      <span className="flex justify-between">
        <div>
          {ex.name}
        </div>
        <div className="flex flex-row">
          <ClosingButton id={ex.id} defaultChecked={defaultChecked} />
          <DeleteExerciseButton id={ex.id} />
        </div>
      </span>
    </>
  );
}