"use client";

import { FaRegTrashAlt } from "react-icons/fa";
import Modal from "@mui/joy/Modal";
import { useState } from "react";
import { deleteExercise } from "@/lib/actions";
import toast from "react-hot-toast";

export default function DeleteExerciseButton({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="text-zinc-200 hover:text-zinc-400"
        onClick={() => setOpen(true)}
      >
        <FaRegTrashAlt size={20} strokeWidth={8} />
      </button>
      <Modal
        open={open}
        onClose={(event, reason: string) => {
          if (reason !== "backdropClick") setOpen(false);
        }}
        className="flex items-center justify-center bg-black/50 backdrop-blur-0"
      >
        <div className="flex w-5/6 flex-col justify-center rounded-lg border border-zinc-800 bg-black p-6 text-center sm:w-full sm:max-w-lg">
          <span className="text-lg font-medium sm:text-left">
            Are you sure?
          </span>
          <span className="pt-1 text-sm leading-tight text-zinc-400 sm:text-left">
            This action cannot be undone. This will permanently remove this
            exercise from this workout.
          </span>
          <div className="mt-4 flex flex-col-reverse space-y-2 space-y-reverse sm:flex-row sm:justify-end sm:space-x-2 sm:space-y-0">
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
