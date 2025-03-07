"use client";

import ExerciseMenuButton from "@/components/exercise-menu-button";
import { useState } from "react";
import { GoDash, GoPlus } from "react-icons/go";
import AddSet from "@/components/add-set";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function ExerciseComponent({
  thisExercise,
  pastExercisesWithSets,
}: {
  thisExercise: {
    id: string;
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
  pastExercisesWithSets: {
    name: string;
    createdAt: Date;
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
  const subheading =
    thisExercise.sets.length === 0
      ? `No sets • ${thisExercise.notes || "No additional notes"}`
      : thisExercise.sets.length === 1
        ? `1 set • ${thisExercise.notes || "No additional notes"}`
        : `${thisExercise.sets.length} sets • ${thisExercise.notes || "No additional notes"}`;

  const [newSetOpen, setNewSetOpen] = useState(false);
  const [parent, enableAnimations] = useAutoAnimate();
  return (
    <div ref={parent} className="space-y-0">
      <div className="-mb-1 flex justify-between">
        <div className="mb-0.5 flex flex-col -space-y-0.5">
          <span className="text-lg font-semibold">{thisExercise.name}</span>
          <span className="text-sm text-zinc-400">{subheading}</span>
        </div>
        <div className="flex flex-row">
          <button
            className="relative mt-1 flex h-10 w-10 items-center justify-center rounded-md transition-all hover:bg-zinc-800"
            onClick={() => setNewSetOpen((prev) => !prev)}
          >
            {newSetOpen ? (
              <GoDash size={30} strokeWidth={1.3} className="pb-[3px]" />
            ) : (
              <GoPlus size={28} strokeWidth={1.2} />
            )}
          </button>
          <ExerciseMenuButton
            id={thisExercise.id}
            name={thisExercise.name}
            notes={thisExercise.notes || ""}
            pastExsWithSets={pastExercisesWithSets.sort(
              (a, b) => b.createdAt.valueOf() - a.createdAt.valueOf(),
            )}
          />
        </div>
      </div>
      <Sets sets={thisExercise.sets} />
      {newSetOpen && thisExercise.sets.length === 0 && (
        <div className="pt-2.5"></div>
      )}
      {newSetOpen && <AddSet id={thisExercise.id} />}
    </div>
  );
}

function Sets({
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
  const [parent, enableAnimations] = useAutoAnimate();
  if (sets.length === 0) return null;
  return (
    <>
      <div className="flex w-full flex-col overflow-hidden pt-3">
        <ul
          ref={parent}
          className="flex grow flex-col divide-y-[1px] divide-zinc-800"
        >
          {sets.map((set, idx) => (
            <li
              className={`flex flex-row pt-0.5 ${
                idx !== sets.length - 1 ? "pb-1" : "-mb-1"
              }`}
              key={set.id}
            >
              <span className="whitespace-nowrap pr-1 text-2xl font-light text-zinc-400">
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
