"use client";

import { FaRegTrashAlt } from "react-icons/fa";
import Modal from '@mui/joy/Modal';
import { useState } from "react";
import { deleteExercise } from "./actions";

export default function DeleteExerciseButton({
  id
}: {
  id: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="ml-3 text-stone-200 hover:text-stone-400"
        onClick={() => setOpen(true)}
      >
        <FaRegTrashAlt size={20} strokeWidth={8} />
      </button>
      <Modal open={open} onClose={() => setOpen(false)} className="flex justify-center items-center">
        <div className="flex flex-col justify-center text-center w-2/3 sm:w-80 h-40 rounded-lg bg-[#292929] space-y-7 shadow-[0_0_0_3000px_rgba(0,0,0,0.3)]">
          <span className="text-lg font-medium">Are you sure?</span>
          <div className="flex justify-evenly">
            <button className="text-gray-300 hover:text-gray-400 border border-gray-200 hover:border-gray-400 h-12 w-1/3 flex items-center justify-center rounded-md text-md font-semibold transition-all focus:outline-none"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="bg-red-800 hover:bg-red-900 text-gray-300 hover:text-gray-400 border border-black h-12 w-1/3 flex items-center justify-center rounded-md text-md font-semibold transition-all focus:outline-none"
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