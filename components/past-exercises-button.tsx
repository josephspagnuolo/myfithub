"use client";

import { GoHistory } from "react-icons/go";
import Modal from '@mui/joy/Modal';
import { useState } from "react";

export default function PastExercisesButton({
  name, pastExsWithSets
}: {
  name: string;
  pastExsWithSets: {
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
    return (set.reps !== "" && set.weight !== "") ? (Number(set.reps) === 1) ? (`${set.reps} rep of ${set.weight} lbs`) : (`${set.reps} reps of ${set.weight} lbs`)
      : (set.reps !== "") ? (Number(set.reps) === 1) ? (`${set.reps} rep`) : (`${set.reps} reps`)
        : (set.weight !== "") ? (`${set.weight} lbs`)
          : ""
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
    return (set.timehrs !== "" && set.timemins !== "" && set.timeseconds !== "") ? (`${set.timehrs}hr ${set.timemins}min ${set.timeseconds}s`)
      : (set.timehrs !== "" && set.timemins !== "") ? (`${set.timehrs}hr and ${set.timemins}min`)
        : (set.timehrs !== "" && set.timeseconds !== "") ? (`${set.timehrs}hr and ${set.timeseconds}s`)
          : (set.timemins !== "" && set.timeseconds !== "") ? (`${set.timemins}min and ${set.timeseconds}s`)
            : (set.timehrs !== "") ? (Number(set.timehrs) === 1) ? (`${set.timehrs} hour`) : (`${set.timehrs} hours`)
              : (set.timemins !== "") ? (Number(set.timemins) === 1) ? (`${set.timemins} minute`) : (`${set.timemins} minutes`)
                : (set.timeseconds !== "") ? (Number(set.timeseconds) === 1) ? (`${set.timeseconds} second`) : (`${set.timeseconds} seconds`)
                  : ""
  }

  function daysAgo(date: Date) {
    const today = new Date();
    return Math.floor((today.getTime() - date.getTime()) / 1000 / 60 / 60 / 24);
  }

  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="text-zinc-200 hover:text-zinc-400"
        onClick={() => setOpen(true)}
      >
        <GoHistory size={21.4} strokeWidth={0.8} />
      </button >
      <Modal open={open} onClose={() => setOpen(false)} className="flex justify-center items-center backdrop-blur-md bg-zinc-400/15">
        <div className="flex flex-col justify-center align-top text-center w-3/4 sm:w-96 max-h-80 rounded-lg bg-[#1a1a1c] p-5">
          <span className="text-lg pb-6 text-nowrap overflow-hidden overflow-ellipsis">Recent Lifts: <span className="font-bold">{name}</span></span>
          <div className="flex flex-col max-h-60 overflow-y-auto thin-scroll space-y-6 align-top">
            {pastExsWithSets.length === 0 ? (
              <span className="text-zinc-400 text-sm">
                Nothing to show...
              </span>
            ) : (
              <>
                {pastExsWithSets.map((ex, index) => (
                  <div className="flex flex-col" key={ex.name + index}>
                    <span className="text-sm -mb-0.5">
                      {daysAgo(ex.createdAt) === 1 ? (daysAgo(ex.createdAt) + " day ago ") : (daysAgo(ex.createdAt) + " days ago ")}
                      <span className="text-zinc-400 text-sm">
                        {" (" + ex.createdAt.toLocaleString('en-US', { timeZone: 'America/New_York', weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric' }) + ")"}
                      </span>
                    </span>
                    <div className="flex flex-col text-left">
                      {ex.sets.length === 0 ? (
                        <span className="text-zinc-400 text-sm text-center">
                          No sets so far...
                        </span>
                      ) : (
                        <>
                          <ul className="flex flex-col divide-y-[1px] space-y-1">
                            {ex.sets.map((set, idx) => (
                              <li className="pb-1 pt-1.5" key={set.id}>
                                <span className="text-zinc-400 text-2xl font-light pr-1">Set {idx + 1}:&nbsp;</span>
                                {getSetString1(set) === "" ? (
                                  <span className=" text-2xl">{getSetString2(set)}</span>
                                ) : (
                                  ""
                                )}
                                {getSetString2(set) === "" ? (
                                  <span className=" text-2xl">{getSetString1(set)}</span>
                                ) : (
                                  ""
                                )}
                                {(getSetString1(set) !== "" && getSetString2(set) !== "") ? (
                                  <span className=" text-2xl">{getSetString1(set) + ", " + getSetString2(set)}</span>
                                ) : (
                                  ""
                                )}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}