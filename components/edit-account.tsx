"use client";

import { MdEdit } from "react-icons/md";
import { useState } from "react";
import Modal from "@mui/joy/Modal";
import LoadingDots from "@/components/loading-dots";
import { editAccount } from "@/lib/actions";
import toast from "react-hot-toast";
import Input from "@mui/joy/Input";
import { CssVarsProvider } from "@mui/joy";

export default function EditAccountButton({
  id,
  name,
  email,
}: {
  id: string;
  name: string;
  email: string;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <>
      <button
        className="text-md flex h-10 items-center justify-center rounded-md border border-black bg-sky-600 px-6 font-semibold transition-all hover:bg-sky-700"
        onClick={() => setOpen(true)}
      >
        <MdEdit size={20} className="mb-px mt-px" />
        <span className="ml-3">Edit Details</span>
      </button>
      <Modal
        disableRestoreFocus
        open={open}
        onClose={() => {
          if (!loading) setOpen(false);
        }}
        className="flex items-center justify-center bg-black/50 backdrop-blur-0"
      >
        <div className="fixed grid w-5/6 rounded-lg border border-zinc-800 bg-black p-6 sm:w-full sm:max-w-md">
          <div className="mb-2 flex flex-col -space-y-0.5 text-center sm:text-left">
            <span className="text-lg font-semibold">Edit Details</span>
            <span className="text-sm text-zinc-400">
              This will change your account information.
            </span>
          </div>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              await editAccount(id, e.currentTarget.nametext.value);
              toast.success("Your account details have been saved.");
              setLoading(false);
              setOpen(false);
            }}
            className="mt-3 flex flex-col space-y-4"
          >
            <div>
              <label htmlFor="nametext" className="block text-xs text-zinc-400">
                Your Name
              </label>
              <CssVarsProvider defaultMode="dark" />
              <Input
                id="nametext"
                name="nametext"
                type="text"
                required
                disabled={loading}
                defaultValue={name}
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
            <div>
              <label htmlFor="email" className="block text-xs text-zinc-400">
                Your Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                disabled
                defaultValue={email}
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
    </>
  );
}
