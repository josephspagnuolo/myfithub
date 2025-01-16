"use client";

import { useState } from "react";
import LoadingDots from "@/components/loading-dots";
import toast from "react-hot-toast";
import { Modal } from "@mui/joy";
import { copyWorkout } from "@/lib/actions";
import { useRouter } from "next/navigation";

export default function CopyWorkout({
  workouts,
}: {
  workouts: {
    id: string;
    content: string;
    createdAt: Date;
  }[];
}) {
  const [loading, setLoading] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function submit() {
    if (!selectedWorkout) {
      toast("Please select a workout to copy", {
        id: "copy-workout",
        icon: "⚠️",
      });
      return null;
    }
    setLoading(true);
    toast.loading("Copying workout...", {
      id: "copy-workout",
    });
    const res = await copyWorkout(selectedWorkout);
    if (res === "error") {
      toast.error("There was an error copying the workout.", {
        id: "copy-workout",
      });
      setLoading(false);
    } else {
      toast.success("Workout copied successfully!", {
        id: "copy-workout",
      });
      router.push(`/dashboard/workout/${res}`);
      router.refresh();
    }
  }

  return (
    <>
      <button
        className="flex items-center rounded-lg border border-zinc-800 bg-black p-3 py-2 transition-all hover:bg-zinc-800"
        onClick={() => setOpen(true)}
      >
        <span className="px-1.5">Copy your past workout</span>
      </button>
      <Modal
        aria-labelledby="Copy Workout"
        aria-describedby="Select one of your past workouts to duplicate."
        disableRestoreFocus
        open={open}
        className="flex items-center justify-center"
        onClose={() => {
          if (!loading) {
            setOpen(false);
            setSelectedWorkout(null);
          }
        }}
      >
        <div className="fixed flex w-5/6 flex-col rounded-lg border border-zinc-800 bg-black p-6 sm:w-full sm:max-w-md">
          <div className="mb-2 flex flex-col -space-y-0.5 text-center sm:text-left">
            <span className="text-lg font-semibold">Copy a Workout</span>
            <span className="text-sm text-zinc-400">
              Select one of your past workouts to duplicate.
            </span>
          </div>
          <div className="-mr-3.5 mt-3 flex flex-col space-y-4">
            <div className="thin-scroll flex max-h-48 flex-col overflow-y-auto align-top">
              {workouts.length === 0 ? (
                <span className="pb-1 text-sm text-zinc-400">
                  No past workouts to copy...
                </span>
              ) : (
                <ul className="mr-3.5 flex flex-col divide-y divide-zinc-800 overflow-clip rounded-md border border-zinc-800">
                  {workouts
                    .sort(
                      (a, b) => a.createdAt.valueOf() - b.createdAt.valueOf(),
                    )
                    .reverse()
                    .map((workout) => (
                      <li
                        key={workout.id}
                        className={`${selectedWorkout === workout.id ? "bg-zinc-800" : "hover:bg-zinc-900"}`}
                      >
                        <button
                          onClick={() => setSelectedWorkout(workout.id)}
                          className="flex w-full cursor-pointer items-center justify-between space-x-1.5 p-4 transition-all"
                        >
                          <div className="flex items-center truncate">
                            <span className="truncate">{workout.content}</span>
                          </div>
                          <span className="whitespace-nowrap text-sm text-zinc-400">
                            {workout.createdAt.toLocaleString("en-US", {
                              timeZone: "America/New_York",
                              dateStyle: "medium",
                              timeStyle: "short",
                            })}
                          </span>
                        </button>
                      </li>
                    ))}
                </ul>
              )}
            </div>
            <div className="mr-3.5 sm:w-20 sm:justify-end sm:self-end">
              <button
                onClick={submit}
                disabled={loading || !selectedWorkout}
                className={`${
                  loading
                    ? "cursor-not-allowed border border-black bg-black"
                    : `border border-black bg-sky-600 ${!selectedWorkout ? "cursor-not-allowed opacity-40" : "hover:bg-sky-700"}`
                } text-md flex h-10 w-full items-center justify-center rounded-md font-semibold transition-all`}
              >
                {loading ? <LoadingDots color="#808080" /> : <p>Copy</p>}
              </button>
            </div>
          </div>
          <button
            className="absolute right-3 top-3 rounded-md p-1 hover:bg-zinc-800"
            onClick={() => {
              if (!loading) {
                setOpen(false);
                setSelectedWorkout(null);
              }
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
