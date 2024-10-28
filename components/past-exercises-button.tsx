"use client";

import { GoHistory } from "react-icons/go";
import Modal from "@mui/joy/Modal";
import { useState } from "react";

export default function PastExercisesButton({
  name,
  pastExsWithSets,
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

  function daysAgo(date: Date) {
    const today = new Date();
    return Math.floor((today.getTime() - date.getTime()) / 1000 / 60 / 60 / 24);
  }

  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="ml-px text-zinc-200 hover:text-zinc-400"
        onClick={() => setOpen(true)}
      >
        <GoHistory size={21.4} strokeWidth={0.8} />
      </button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        className="flex items-center justify-center bg-black/50 backdrop-blur-0"
      >
        <div className="fixed grid w-5/6 rounded-lg border border-zinc-800 bg-black p-6 sm:w-full sm:max-w-md">
          <span className="overflow-hidden overflow-ellipsis text-nowrap pb-6 text-lg">
            Recent Lifts: <span className="font-bold">{name}</span>
          </span>
          <div className="thin-scroll flex max-h-60 flex-col space-y-6 overflow-y-auto align-top">
            {pastExsWithSets.length === 0 ? (
              <span className="pb-1 text-sm text-zinc-400">
                Nothing to show...
              </span>
            ) : (
              <>
                {pastExsWithSets.map((ex, index) => (
                  <div className="flex flex-col" key={ex.name + index}>
                    <span className="-mb-0.5 text-sm">
                      {daysAgo(ex.createdAt) === 1
                        ? daysAgo(ex.createdAt) + " day ago "
                        : daysAgo(ex.createdAt) + " days ago "}
                      <span className="text-sm text-zinc-400">
                        {" (" +
                          ex.createdAt.toLocaleString("en-US", {
                            timeZone: "America/New_York",
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                          }) +
                          ")"}
                      </span>
                    </span>
                    <div className="flex flex-col text-left">
                      {ex.sets.length === 0 ? (
                        <span className="text-center text-sm text-zinc-400">
                          No sets so far...
                        </span>
                      ) : (
                        <>
                          <ul className="flex flex-col space-y-1 divide-y-[1px]">
                            {ex.sets.map((set, idx) => (
                              <li className="pb-1 pt-1.5" key={set.id}>
                                <span className="pr-1 text-2xl font-light text-zinc-400">
                                  Set {idx + 1}:&nbsp;
                                </span>
                                {getSetString1(set) === "" ? (
                                  <span className="text-2xl">
                                    {getSetString2(set)}
                                  </span>
                                ) : (
                                  ""
                                )}
                                {getSetString2(set) === "" ? (
                                  <span className="text-2xl">
                                    {getSetString1(set)}
                                  </span>
                                ) : (
                                  ""
                                )}
                                {getSetString1(set) !== "" &&
                                getSetString2(set) !== "" ? (
                                  <span className="text-2xl">
                                    {getSetString1(set) +
                                      ", " +
                                      getSetString2(set)}
                                  </span>
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
          <button
            className="absolute right-3 top-3 rounded-md p-1 hover:bg-zinc-800"
            onClick={() => setOpen(false)}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
            >
              <path
                d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </Modal>
    </>
  );
}
