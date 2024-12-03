"use client";

import { FaRegTrashAlt } from "react-icons/fa";
import Modal from "@mui/joy/Modal";
import { useState } from "react";
import { deleteAccount } from "@/lib/actions";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Input from "@mui/joy/Input";
import { CssVarsProvider } from "@mui/joy";

export default function DeleteAccountButton({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState("");
  const router = useRouter();
  return (
    <>
      <button
        className="text-md flex h-10 flex-row items-center rounded-md border border-zinc-800 bg-zinc-950 px-6 font-semibold text-red-600 transition-all hover:bg-zinc-800"
        onClick={() => setOpen(true)}
      >
        <span>Delete your account</span>
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
              This action cannot be undone. This will permanently delete your
              MyFitHub account and all associated data from our records.
            </span>
          </div>
          <div className="mt-3 text-sm sm:text-left">
            <label htmlFor="confirm">
              Please type <span className="font-semibold">CONFIRM</span> to
              complete this action.
            </label>
            <CssVarsProvider defaultMode="dark" />
            <Input
              id="confirm"
              autoComplete="off"
              onChange={(e) => setConfirm(e.target.value)}
              type="text"
              required
              disabled={loading}
              sx={{
                "--Input-focusedThickness": "0rem",
                "--Input-placeholderOpacity": 0.25,
                height: "40px",
                "--tw-border-opacity": 1,
                borderColor: "rgb(39 39 42 / var(--tw-border-opacity))",
                "--tw-shadow": "0 0 #0000",
                "--tw-shadow-colored": "0 0 #0000",
                boxShadow:
                  "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)",
              }}
              className="mt-1 w-full border border-zinc-800 shadow-none focus-within:outline-none focus-within:ring-2 focus-within:ring-sky-600"
            />
          </div>
          <div className="mt-4 flex flex-col-reverse space-y-2 space-y-reverse sm:flex-row sm:justify-end sm:space-x-2 sm:space-y-0">
            <button
              className="text-md flex h-10 w-full items-center justify-center rounded-md border border-zinc-800 font-semibold transition-all hover:bg-zinc-800 sm:w-20"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={confirm !== "CONFIRM" || loading}
              className="text-md flex h-10 w-full items-center justify-center rounded-md border border-black bg-red-800 font-semibold transition-all hover:bg-red-900 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-red-800 sm:w-20"
              onClick={async () => {
                setLoading(true);
                const toastId = toast.loading("Deleting...");
                deleteAccount(id);
                const data = await signOut({
                  redirect: false,
                  callbackUrl: "/",
                });
                router.push(data.url);
                router.refresh();
                toast.success("Your account has been deleted.", {
                  id: toastId,
                  duration: 10000,
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
