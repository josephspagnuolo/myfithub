"use client";

import { MdEdit } from "react-icons/md";
import { useState } from 'react';
import Modal from '@mui/joy/Modal';
import LoadingDots from "@/components/loading-dots";
import { editAccount } from "@/lib/actions";
import toast from "react-hot-toast";

export default function EditAccountButton({
  id, name
}: {
  id: string;
  name: string;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <>
      <button className="bg-sky-600 hover:bg-sky-700 border border-black h-10 px-6 flex items-center justify-center rounded-md text-md font-semibold transition-all"
        onClick={() => setOpen(true)}
      >
        <MdEdit size={20} className="mt-px" />
        <span className="ml-3">Edit Details</span>
      </button>
      <Modal disableRestoreFocus open={open} onClose={() => { if (!loading) setOpen(false) }} className="flex justify-center items-center backdrop-blur-0 bg-black/50">
        <div className="fixed grid w-5/6 sm:w-full sm:max-w-md p-6 rounded-lg bg-black border border-zinc-800">
          <span className="text-lg font-medium text-center sm:text-left">Edit Details</span>
          <span className="text-sm text-zinc-400 pt-1 leading-tight text-center sm:text-left">This will change your account information.</span>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              await editAccount(id, e.currentTarget.nametext.value);
              toast.success("Your account details have been changed.");
              setLoading(false);
              setOpen(false);
            }}
            className="flex flex-col space-y-4 pt-6"
          >
            <div>
              <label
                htmlFor="nametext"
                className="block text-xs text-zinc-400"
              >
                Your Name
              </label>
              <input
                id="nametext"
                name="nametext"
                type="text"
                autoFocus
                required
                defaultValue={name}
                className="mt-1 block w-full appearance-none rounded-md border border-zinc-800 bg-black px-3 py-2 placeholder-zinc-400 shadow-sm focus:border-zinc-400 focus:outline-none focus:ring-black sm:text-sm placeholder-opacity-25" />
            </div>
            <div className="sm:self-end sm:justify-end sm:w-20">
              <button
                type="submit"
                disabled={loading}
                className={`${loading
                  ? "bg-black border border-black cursor-not-allowed"
                  : "bg-sky-600 hover:bg-sky-700 border border-black"
                  } h-10 w-full flex items-center justify-center rounded-md text-md font-semibold transition-all`}
              >
                {loading ? (
                  <LoadingDots color="#808080" />
                ) : (
                  <p>Save</p>
                )}
              </button>
            </div>
          </form>
          <button className="absolute right-3 top-3 p-1 rounded-md hover:bg-zinc-800"
            onClick={() => setOpen(false)}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
              <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </button>
        </div>
      </Modal>
    </>
  );
}