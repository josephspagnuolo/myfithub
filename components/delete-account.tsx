"use client";

import { FaRegTrashAlt } from "react-icons/fa";
import Modal from '@mui/joy/Modal';
import { useState } from "react";
import { deleteAccount } from "@/lib/actions";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DeleteAccountButton({
  id
}: {
  id: string;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState("");
  const router = useRouter();
  return (
    <>
      <button className="flex flex-row items-center h-10 px-6 rounded-md hover:bg-zinc-800 transition-all text-red-600 border border-zinc-800 bg-stone-950 text-md font-semibold"
        onClick={() => setOpen(true)}
      >
        <span>Delete your account</span>
      </button>
      <Modal open={open} onClose={(event, reason: string) => { if (reason !== "backdropClick") setOpen(false) }} className="flex justify-center items-center backdrop-blur-0 bg-black/50">
        <div className="flex flex-col justify-center text-center w-5/6 sm:w-full sm:max-w-lg p-6 rounded-lg bg-black border border-zinc-800">
          <span className="text-lg font-medium sm:text-left">Are you sure?</span>
          <span className="text-sm text-zinc-400 pt-1 leading-tight sm:text-left">This action cannot be undone. This will permanently delete your MyFitHub account and all associated data from our records.</span>
          <div className="mt-3 text-sm text-zinc-400 sm:text-left">
            <label htmlFor="confirm">Please type <span className="font-semibold">CONFIRM</span> to complete this action.</label>
            <input
              id="confirm"
              autoComplete="off"
              onChange={(e) => setConfirm(e.target.value)}
              type="text"
              required
              className="mt-1 block w-full appearance-none rounded-md border border-zinc-800 bg-black px-3 py-2 placeholder-zinc-400 shadow-sm focus:border-zinc-400 focus:outline-none focus:ring-black sm:text-sm placeholder-opacity-25"
            />
          </div>
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 space-y-2 space-y-reverse sm:space-y-0 mt-4">
            <button className="border border-zinc-800 hover:bg-zinc-800 h-10 w-full sm:w-20 flex items-center justify-center rounded-md text-md font-semibold transition-all"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" disabled={confirm !== "CONFIRM" || loading}
              className="bg-red-800 hover:bg-red-900 border border-black h-10 w-full sm:w-20 flex items-center justify-center rounded-md text-md font-semibold transition-all disabled:cursor-not-allowed disabled:hover:bg-red-800 disabled:opacity-50"
              onClick={async () => {
                setLoading(true);
                const toastId = toast.loading("Deleting...")
                deleteAccount(id);
                const data = await signOut({ redirect: false, callbackUrl: "/" });
                router.push(data.url);
                router.refresh();
                toast.success("Your account has been deleted.", {
                  id: toastId,
                  duration: 10000
                });
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