"use client";

import { BsThreeDots } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { Dispatch, SetStateAction, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import LoadingDots from "@/components/loading-dots";
import { deleteWorkout, editWorkoutTitle } from "@/lib/actions";
import toast from "react-hot-toast";
import LogoSVG from "@/components/logo-svg";
import {
  Dropdown,
  MenuButton,
  Menu,
  MenuItem,
  Modal,
  Input,
  IconButton,
} from "@mui/joy";
import { useRouter } from "next/navigation";

export default function WorkoutMenuButton({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const router = useRouter();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  return (
    <>
      <Dropdown>
        <MenuButton
          slots={{ root: IconButton }}
          slotProps={{ root: { variant: "plain", color: "neutral" } }}
          sx={{
            height: "40px",
            width: "40px",
            "& > *": {
              color: "#fafafa",
            },
            "&:hover": {
              backgroundColor: "#27272a",
            },
            "&:focus-visible": {
              outlineWidth: "2px",
              outlineOffset: "0px",
              outlineColor: "#fff",
            },
          }}
        >
          <BsThreeDots size={20} />
        </MenuButton>
        <Menu
          placement="bottom-end"
          sx={{
            p: "4px",
            width: "144px",
            border: "1px solid #27272a",
            borderRadius: "8px",
          }}
        >
          <MenuItem
            onClick={() => router.push(`/dashboard/workout/${id}`)}
            className="items-center rounded-[4px] px-2 *:text-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-white"
          >
            <LogoSVG className="mt-px h-5 w-5" />
            <span>View</span>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setEditModalOpen(true);
            }}
            className="items-center rounded-[4px] px-2 *:text-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-white"
          >
            <MdEdit size={20} className="mt-px" />
            <span>Edit Title</span>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setDeleteModalOpen(true);
            }}
            className="items-center rounded-[4px] px-2 *:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-white"
          >
            <FaRegTrashAlt size={20} strokeWidth={8} className="mt-px" />
            <span className="font-medium">Delete</span>
          </MenuItem>
        </Menu>
      </Dropdown>
      <EditWorkoutModal
        id={id}
        title={title}
        open={editModalOpen}
        setOpen={setEditModalOpen}
      />
      <DeleteWorkoutModal
        id={id}
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
      />
    </>
  );
}

function EditWorkoutModal({
  id,
  title,
  open,
  setOpen,
}: {
  id: string;
  title: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [loading, setLoading] = useState(false);
  return (
    <Modal
      aria-labelledby="Edit Title"
      aria-describedby="This will change the name of the selected workout."
      disableRestoreFocus
      open={open}
      onClose={() => {
        if (!loading) setOpen(false);
      }}
      className="flex items-center justify-center"
    >
      <div className="fixed grid w-5/6 rounded-lg border border-zinc-800 bg-black p-6 sm:w-full sm:max-w-md">
        <div className="mb-2 flex flex-col -space-y-0.5 text-center sm:text-left">
          <span className="text-lg font-semibold">Edit Workout Title</span>
          <span className="text-sm text-zinc-400">
            This will change the name of the selected workout.
          </span>
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            toast.remove("edit-workout");
            toast.loading("Saving...", {
              id: "edit-workout",
            });
            const res = await editWorkoutTitle(
              id,
              e.currentTarget.content.value,
            );
            if (res === "error") {
              toast.error("There was an error editing your workout.", {
                id: "edit-workout",
              });
            } else {
              toast.success("Your workout title has been changed.", {
                id: "edit-workout",
              });
              setOpen(false);
            }
            setLoading(false);
          }}
          className="mt-3 flex flex-col space-y-4"
        >
          <div>
            <label htmlFor="content" className="block text-xs text-zinc-400">
              Workout Name
            </label>
            <Input
              id="content"
              name="content"
              type="text"
              placeholder="Chest Day"
              autoFocus
              required
              disabled={loading}
              defaultValue={title}
              slotProps={{
                input: {
                  maxLength: 22,
                },
              }}
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
  );
}

function DeleteWorkoutModal({
  id,
  open,
  setOpen,
}: {
  id: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [loading, setLoading] = useState(false);
  return (
    <Modal
      aria-labelledby="Delete Workout"
      aria-describedby="This will permanently delete this workout from all records."
      open={open}
      onClose={(event, reason: string) => {
        if (reason !== "backdropClick" && !loading) setOpen(false);
      }}
      className="flex items-center justify-center"
    >
      <div className="flex w-5/6 flex-col justify-center rounded-lg border border-zinc-800 bg-black p-6 text-center sm:w-full sm:max-w-lg">
        <div className="mb-2 flex flex-col -space-y-0.5 text-center sm:text-left">
          <span className="text-lg font-semibold">Are you sure?</span>
          <span className="text-sm text-zinc-400">
            This action cannot be undone. This will permanently delete this
            workout from all records.
          </span>
        </div>
        <div className="mt-3 flex flex-col-reverse space-y-2 space-y-reverse sm:flex-row sm:justify-end sm:space-x-2 sm:space-y-0">
          <button
            className="text-md flex h-10 w-full items-center justify-center rounded-md border border-zinc-800 font-semibold transition-all hover:bg-zinc-800 sm:w-20"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="text-md flex h-10 w-full items-center justify-center rounded-md border border-black bg-red-800 font-semibold transition-all hover:bg-red-900 sm:w-20"
            onClick={async () => {
              setLoading(true);
              toast.remove("delete-workout");
              toast.loading("Deleting...", {
                id: "delete-workout",
              });
              const res = await deleteWorkout(id);
              if (res === "error") {
                toast.error("There was an error deleting your workout.", {
                  id: "delete-workout",
                });
              } else {
                toast.success("Your workout has been deleted.", {
                  id: "delete-workout",
                });
                setOpen(false);
              }
              setLoading(false);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}
