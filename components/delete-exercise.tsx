"use client";

import { FaRegTrashAlt } from "react-icons/fa";
import Modal from '@mui/joy/Modal';
import { useState } from "react";
import { deleteExercise } from "../lib/actions";

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
      <Modal open={open} onClose={() => setOpen(false)} className="flex justify-center items-center backdrop-blur-md bg-zinc-400/15">
        <div className="flex flex-col justify-center text-center w-3/4 sm:w-96 h-40 rounded-lg bg-[#1a1a1c] space-y-7">
          <span className="text-lg font-medium">Are you sure?</span>
          <div className="flex justify-evenly">
            <button className=" hover:text-zinc-400 border border-zinc-200 hover:border-zinc-400 h-12 w-1/3 flex items-center justify-center rounded-md text-md font-semibold transition-all focus:outline-none"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="bg-red-800 hover:bg-red-900 hover:text-zinc-400 border border-black h-12 w-1/3 flex items-center justify-center rounded-md text-md font-semibold transition-all focus:outline-none"
              onClick={() => {
                deleteExercise(id);
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