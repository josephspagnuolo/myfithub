"use client";

import { FaRegTrashAlt } from "react-icons/fa";
import Modal from '@mui/joy/Modal';
import { useState } from "react";
import { deleteExercise } from "@/lib/actions";
import toast from "react-hot-toast";

export default function DeleteExerciseButton({
  id
}: {
  id: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="text-zinc-200 hover:text-zinc-400"
        onClick={() => setOpen(true)}
      >
        <FaRegTrashAlt size={20} strokeWidth={8} />
      </button>
      <Modal open={open} onClose={(event, reason: string) => { if (reason !== "backdropClick") setOpen(false) }} className="flex justify-center items-center backdrop-blur-0 bg-black/50">
        <div className="flex flex-col justify-center text-center w-5/6 sm:w-full sm:max-w-lg p-6 rounded-lg bg-black border border-zinc-800">
          <span className="text-lg font-medium sm:text-left">Are you sure?</span>
          <span className="text-sm text-zinc-400 pt-1 leading-tight sm:text-left">This action cannot be undone. This will permanently remove this exercise from this workout.</span>
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 space-y-2 space-y-reverse sm:space-y-0 mt-4">
            <button className="border border-zinc-800 hover:bg-zinc-800 h-10 w-full sm:w-20 flex items-center justify-center rounded-md text-md font-semibold transition-all"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="bg-red-800 hover:bg-red-900 border border-black h-10 w-full sm:w-20 flex items-center justify-center rounded-md text-md font-semibold transition-all"
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