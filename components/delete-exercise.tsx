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
        <FaRegTrashAlt size={20} className="" />
      </button>
      <Modal open={open} onClose={() => setOpen(false)} className="flex justify-center items-center">
        <div className="flex flex-col justify-center text-center w-2/3 sm:w-80 h-40 rounded-lg bg-[#292929] space-y-7">
          <span className="text-lg font-medium">Are you sure?</span>
          <div className="flex justify-evenly">
            <button className="text-stone-200 hover:text-stone-400 transition-all border border-stone-200 hover:border-stone-400 flex h-10 w-1/3 items-center justify-center rounded-md"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="bg-red-800 text-gray-300 hover:bg-red-900 flex h-10 w-1/3 items-center justify-center rounded-md"
              onClick={() => {
                deleteExercise(id);
                setOpen(false);
              }}
            >
              Yes, delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}