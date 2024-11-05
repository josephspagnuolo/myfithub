"use client";

import { BsThreeDots } from "react-icons/bs";
import { Dispatch, SetStateAction, useState } from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Modal from "@mui/joy/Modal";
import { FaRegTrashAlt } from "react-icons/fa";
import LoadingDots from "@/components/loading-dots";
import { deleteExercise, editExerciseNotes } from "@/lib/actions";
import toast from "react-hot-toast";
import { GoHistory } from "react-icons/go";
import { MdEdit } from "react-icons/md";

export default function ExerciseMenuButton({
  id,
  name,
  notes,
  pastExsWithSets,
}: {
  id: string;
  name: string;
  notes: string;
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
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };
  return (
    <>
      <ClickAwayListener onClickAway={closeDropdown}>
        <div className="relative inline-block">
          <button
            onClick={toggleDropdown}
            className="relative mt-1 flex h-10 w-10 items-center justify-center rounded-md transition-all hover:bg-zinc-800"
          >
            <BsThreeDots size={20} />
          </button>
          <div
            className={`${isOpen ? "absolute right-0 top-12 z-50 flex w-36 flex-col justify-center" : "hidden"}`}
          >
            <div className="z-10 flex flex-col overflow-clip rounded-md border border-zinc-800 bg-black p-1">
              <PastSetsButton
                name={name}
                pastExsWithSets={pastExsWithSets}
                setDropdownClosed={setIsOpen}
              />
              <EditExerciseNotesButton
                id={id}
                notes={notes}
                setDropdownClosed={setIsOpen}
              />
              <DeleteExerciseButton id={id} setDropdownClosed={setIsOpen} />
            </div>
          </div>
        </div>
      </ClickAwayListener>
    </>
  );
}

function PastSetsButton({
  name,
  pastExsWithSets,
  setDropdownClosed,
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
  setDropdownClosed: Dispatch<SetStateAction<boolean>>;
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
        className="flex flex-row items-center rounded-[5px] p-2.5 py-1.5 transition-all hover:bg-zinc-800"
        onClick={() => {
          setOpen(true);
          setDropdownClosed(false);
        }}
      >
        <GoHistory size={20} strokeWidth={0.8} className="mb-px mt-px" />
        <span className="ml-2">Past Sets</span>
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

function EditExerciseNotesButton({
  id,
  notes,
  setDropdownClosed,
}: {
  id: string;
  notes: string;
  setDropdownClosed: Dispatch<SetStateAction<boolean>>;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <>
      <button
        className="flex flex-row items-center rounded-[5px] p-2.5 py-1.5 transition-all hover:bg-zinc-800"
        onClick={() => {
          setOpen(true);
          setDropdownClosed(false);
        }}
      >
        <MdEdit size={20} className="mb-px mt-px" />
        <span className="ml-2">Edit Notes</span>
      </button>
      <Modal
        disableRestoreFocus
        open={open}
        onClose={() => {
          if (!loading) setOpen(false);
        }}
        className="flex items-center justify-center bg-black/50 backdrop-blur-0"
      >
        <div className="fixed grid w-5/6 rounded-lg border border-zinc-800 bg-black p-6 sm:w-full sm:max-w-md">
          <div className="mb-2 flex flex-col -space-y-0.5 text-center sm:text-left">
            <span className="text-lg font-semibold">Edit Exercise Notes</span>
            <span className="text-sm text-zinc-400">
              This will change the notes of the selected exercise.
            </span>
          </div>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              await editExerciseNotes(id, e.currentTarget.notes.value);
              toast.success("Exercise notes have been changed.");
              setLoading(false);
              setOpen(false);
            }}
            className="mt-3 flex flex-col space-y-4"
          >
            <div>
              <label htmlFor="notes" className="block text-xs text-zinc-400">
                Exercise Notes
              </label>
              <input
                id="notes"
                name="notes"
                type="text"
                placeholder="Focus on range of motion"
                autoFocus
                defaultValue={notes}
                className="mt-1 block w-full appearance-none rounded-md border border-zinc-800 bg-black px-3 py-2 placeholder-zinc-400 placeholder-opacity-25 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-600 sm:text-sm"
              />
            </div>
            <div className="sm:w-20 sm:justify-end sm:self-end">
              <button
                type="submit"
                disabled={loading}
                className={`${
                  loading
                    ? "cursor-not-allowed border border-black bg-black"
                    : "border border-black bg-sky-600 hover:bg-sky-700"
                } text-md flex h-10 w-full items-center justify-center rounded-md font-semibold transition-all`}
              >
                {loading ? <LoadingDots color="#808080" /> : <p>Save</p>}
              </button>
            </div>
          </form>
          <button
            className="absolute right-3 top-3 rounded-md p-1 hover:bg-zinc-800"
            onClick={() => {
              if (!loading) setOpen(false);
            }}
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

function DeleteExerciseButton({
  id,
  setDropdownClosed,
}: {
  id: string;
  setDropdownClosed: Dispatch<SetStateAction<boolean>>;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="flex flex-row items-center rounded-[5px] p-2.5 py-1.5 text-red-600 transition-all hover:bg-zinc-800"
        onClick={() => {
          setOpen(true);
          setDropdownClosed(false);
        }}
      >
        <FaRegTrashAlt size={20} strokeWidth={8} className="mt-px" />
        <span className="ml-2">Delete</span>
      </button>
      <Modal
        open={open}
        onClose={(event, reason: string) => {
          if (reason !== "backdropClick") setOpen(false);
        }}
        className="flex items-center justify-center bg-black/50 backdrop-blur-0"
      >
        <div className="flex w-5/6 flex-col justify-center rounded-lg border border-zinc-800 bg-black p-6 text-center sm:w-full sm:max-w-lg">
          <div className="mb-2 flex flex-col -space-y-0.5 text-center sm:text-left">
            <span className="text-lg font-semibold">Are you sure?</span>
            <span className="text-sm text-zinc-400">
              This action cannot be undone. This will permanently remove this
              exercise from this workout.
            </span>
          </div>
          <div className="mt-3 flex flex-col-reverse space-y-2 space-y-reverse sm:flex-row sm:justify-end sm:space-x-2 sm:space-y-0">
            <button
              className="text-md flex h-10 w-full items-center justify-center rounded-md border border-zinc-800 font-semibold transition-all hover:bg-zinc-800 sm:w-20"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-md flex h-10 w-full items-center justify-center rounded-md border border-black bg-red-800 font-semibold transition-all hover:bg-red-900 sm:w-20"
              onClick={() => {
                deleteExercise(id);
                toast.success("Exercise deleted.");
                setOpen(false);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
