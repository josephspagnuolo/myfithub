"use client";

import { BsThreeDots } from "react-icons/bs";
import { Dispatch, SetStateAction, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import LoadingDots from "@/components/loading-dots";
import { deleteExercise, editExerciseNotes } from "@/lib/actions";
import toast from "react-hot-toast";
import { GoHistory } from "react-icons/go";
import { MdEdit } from "react-icons/md";
import {
  Dropdown,
  MenuButton,
  Menu,
  MenuItem,
  Modal,
  Input,
  IconButton,
} from "@mui/joy";

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
  const [pastSetsModalOpen, setPastSetsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  return (
    <>
      <Dropdown>
        <MenuButton
          slots={{ root: IconButton }}
          sx={{
            mt: "4px",
            "&:hover": {
              backgroundColor: "#27272a",
            },
          }}
          className="mt-1 h-10 w-10 items-center justify-center border-none p-0 transition-all *:text-zinc-50 hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-white"
        >
          <BsThreeDots size={20} />
        </MenuButton>
        <Menu
          placement="bottom-end"
          className="flex w-36 flex-col rounded-md border border-zinc-800 bg-black p-1 text-zinc-50"
        >
          <MenuItem
            onClick={() => {
              setPastSetsModalOpen(true);
            }}
            className="items-center rounded-[5px] px-2 *:text-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-white"
          >
            <GoHistory size={20} strokeWidth={0.8} className="mb-px mt-px" />
            <span className="ml-1.5">Past Sets</span>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setEditModalOpen(true);
            }}
            className="items-center rounded-[5px] px-2 *:text-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-white"
          >
            <MdEdit size={20} className="mb-px mt-px" />
            <span className="ml-1.5">Edit Notes</span>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setDeleteModalOpen(true);
            }}
            className="items-center rounded-[5px] px-2 *:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-white"
          >
            <FaRegTrashAlt size={20} strokeWidth={8} className="mt-px" />
            <span className="ml-1.5 font-medium">Delete</span>
          </MenuItem>
        </Menu>
      </Dropdown>
      <PastSetsModal
        name={name}
        pastExsWithSets={pastExsWithSets}
        open={pastSetsModalOpen}
        setOpen={setPastSetsModalOpen}
      />
      <EditExerciseNotesModal
        id={id}
        notes={notes}
        open={editModalOpen}
        setOpen={setEditModalOpen}
      />
      <DeleteExerciseModal
        id={id}
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
      />
    </>
  );
}

function PastSetsModal({
  name,
  pastExsWithSets,
  open,
  setOpen,
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
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
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

  return (
    <Modal
      aria-labelledby="Past Sets"
      aria-describedby="This will show your recent sets of this exercise."
      open={open}
      onClose={() => setOpen(false)}
      className="flex items-center justify-center"
    >
      <div className="fixed grid w-5/6 rounded-lg border border-zinc-800 bg-black p-6 sm:w-full sm:max-w-md">
        <span className="overflow-hidden overflow-ellipsis text-nowrap pb-6 text-lg">
          Recent Lifts: <span className="font-bold">{name}</span>
        </span>
        <div className="thin-scroll -mr-3.5 flex max-h-60 flex-col space-y-6 overflow-y-auto align-top">
          {pastExsWithSets.length === 0 ? (
            <span className="pb-1 text-sm text-zinc-400">
              Nothing to show...
            </span>
          ) : (
            <>
              {pastExsWithSets.map((ex, index) => (
                <div className="mr-3.5 flex flex-col" key={ex.name + index}>
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
                        <ul className="flex flex-col space-y-1 divide-y-[1px] divide-zinc-800">
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
  );
}

function EditExerciseNotesModal({
  id,
  notes,
  open,
  setOpen,
}: {
  id: string;
  notes: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [loading, setLoading] = useState(false);
  return (
    <Modal
      aria-labelledby="Edit Notes"
      aria-describedby="This will change the notes of the selected exercise."
      disableRestoreFocus
      open={open}
      onClose={() => {
        if (!loading) setOpen(false);
      }}
      className="flex items-center justify-center"
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
            toast.remove("edit-exercise");
            toast.loading("Saving...", {
              id: "edit-exercise",
            });
            const res = await editExerciseNotes(
              id,
              e.currentTarget.notes.value,
            );
            if (res === "error") {
              toast.error("There was an error editing your exercise notes.", {
                id: "edit-exercise",
              });
            } else {
              toast.success("Your exercise notes have been changed.", {
                id: "edit-exercise",
              });
              setOpen(false);
            }
            setLoading(false);
          }}
          className="mt-3 flex flex-col space-y-4"
        >
          <div>
            <label htmlFor="notes" className="block text-xs text-zinc-400">
              Exercise Notes
            </label>
            <Input
              id="notes"
              name="notes"
              type="text"
              placeholder="Focus on range of motion"
              autoFocus
              disabled={loading}
              defaultValue={notes}
              sx={{
                "--Input-focusedThickness": "0rem",
                "--Input-placeholderOpacity": 0.25,
                height: "40px",
                backgroundColor: "black",
                "--tw-border-opacity": 1,
                borderColor: "rgb(39 39 42 / var(--tw-border-opacity))",
                "--tw-shadow": "0 0 #0000",
                "--tw-shadow-colored": "0 0 #0000",
                boxShadow:
                  "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)",
              }}
              className="mt-1 w-full focus-within:outline-none focus-within:ring-2 focus-within:ring-sky-600"
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
  );
}

function DeleteExerciseModal({
  id,
  open,
  setOpen,
}: {
  id: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [loading, setLoading] = useState(false);
  return (
    <Modal
      aria-labelledby="Delete Exercise"
      aria-describedby="This will permanently remove this exercise from this workout."
      open={open}
      onClose={(event, reason: string) => {
        if (reason !== "backdropClick" && !loading) setOpen(false);
      }}
      className="flex items-center justify-center"
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
            onClick={async () => {
              setLoading(true);
              toast.remove("delete-exercise");
              toast.loading("Deleting...", {
                id: "delete-exercise",
              });
              const res = await deleteExercise(id);
              if (res === "error") {
                toast.error("There was an error deleting your exercise.", {
                  id: "delete-exercise",
                });
              } else {
                toast.success("Your exercise has been deleted.", {
                  id: "delete-exercise",
                });
                setOpen(false);
              }
              setLoading(false);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}
