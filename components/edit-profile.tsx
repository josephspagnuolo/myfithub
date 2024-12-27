"use client";

import { MdEdit } from "react-icons/md";
import {
  useState,
  useRef,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  RefObject,
} from "react";
import LoadingDots from "@/components/loading-dots";
import { editProfile, removeProfileImage } from "@/lib/actions";
import toast from "react-hot-toast";
import Image from "next/image";
import { FaRegTrashAlt } from "react-icons/fa";
import { HiUpload } from "react-icons/hi";
import {
  Dropdown,
  MenuButton,
  Menu,
  MenuItem,
  Modal,
  IconButton,
} from "@mui/joy";

export default function EditProfileButton({
  id,
  image,
}: {
  id: string;
  image: string;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  return (
    <>
      <Dropdown>
        <MenuButton
          slots={{ root: IconButton }}
          slotProps={{ root: { variant: "plain", color: "neutral" } }}
          sx={{
            width: "36px",
            height: "36px",
            padding: "8px",
            backgroundColor: "#0284c7",
            borderRadius: "9999px",
            "& > *": {
              color: "#fafafa",
            },
            "&:hover": {
              backgroundColor: "#0369a1",
            },
            "&:focus-visible": {
              outlineWidth: "2px",
              outlineOffset: "0px",
              outlineColor: "#fff",
            },
          }}
        >
          <MdEdit size={20} />
        </MenuButton>
        <Menu
          placement="top-start"
          sx={{
            p: "4px",
            width: "144px",
            border: "1px solid #27272a",
            borderRadius: "8px",
          }}
        >
          <MenuItem
            className="items-center rounded-[4px] px-2 *:text-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-white"
            onClick={() => {
              inputRef.current?.click();
            }}
          >
            <HiUpload size={20} />
            <span>Upload</span>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setRemoveModalOpen(true);
            }}
            className="items-center rounded-[4px] px-2 *:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-white"
          >
            <FaRegTrashAlt size={20} strokeWidth={8} className="mt-px" />
            <span className="font-medium">Remove</span>
          </MenuItem>
        </Menu>
      </Dropdown>
      <UploadImageModal
        id={id}
        image={image}
        open={uploadModalOpen}
        setOpen={setUploadModalOpen}
        inputRef={inputRef}
      />
      <RemoveImageModal
        id={id}
        image={image}
        open={removeModalOpen}
        setOpen={setRemoveModalOpen}
      />
    </>
  );
}

function UploadImageModal({
  id,
  image,
  open,
  setOpen,
  inputRef,
}: {
  id: string;
  image: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  inputRef: RefObject<HTMLInputElement | null>;
}) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileFromInput = e.target.files?.[0];
    if (fileFromInput) {
      setOpen(true);
      setFile(fileFromInput);
      const objectUrl = URL.createObjectURL(fileFromInput);
      setPreview(objectUrl);
    }
  };

  const imgSrc = image === "" ? "/user.png" : image;
  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleFileChange}
        className="hidden"
      />
      <Modal
        aria-labelledby="Profile Image"
        aria-describedby="This will change the image associated with your profile."
        disableRestoreFocus
        open={open}
        onClose={() => {
          if (!loading) {
            setOpen(false);
            setPreview(null);
          }
        }}
        className="flex items-center justify-center"
      >
        <div className="fixed grid w-5/6 rounded-lg border border-zinc-800 bg-black p-6 sm:w-full sm:max-w-md">
          <div className="mb-2 flex flex-col -space-y-0.5 text-center sm:text-left">
            <span className="text-lg font-semibold">Profile Image</span>
            <span className="text-sm text-zinc-400">
              This will change the image associated with your profile.
            </span>
          </div>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              toast.remove("edit-profile");
              toast.loading("Uploading...", {
                id: "edit-profile",
              });
              if (file) {
                const formData = new FormData();
                formData.append("file", file);
                const res = await editProfile(id, image, formData);
                if (res === "error") {
                  toast.error("There was an error editing your profile.", {
                    id: "edit-profile",
                  });
                } else {
                  toast.success("Your profile image has been saved.", {
                    id: "edit-profile",
                  });
                  setOpen(false);
                }
              } else {
                toast.error("There was an error uploading your photo.", {
                  id: "edit-profile",
                });
              }
              setLoading(false);
            }}
            className="mt-3 flex flex-col space-y-4"
          >
            <div className="flex justify-center">
              <Image
                alt="Profile Image"
                src={preview ? preview : imgSrc}
                width={180}
                height={180}
                className="h-[180px] w-[180px] rounded-full object-cover object-center"
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
              if (!loading) {
                setOpen(false);
                setPreview(null);
              }
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

function RemoveImageModal({
  id,
  image,
  open,
  setOpen,
}: {
  id: string;
  image: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [loading, setLoading] = useState(false);
  return (
    <Modal
      aria-labelledby="Remove Profile Image"
      aria-describedby="This will permanently delete the image associated with your profile."
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
            This action cannot be undone. This will permanently delete the image
            associated with your profile.
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
              toast.remove("remove-profile-image");
              toast.loading("Removing...", {
                id: "remove-profile-image",
              });
              const res = await removeProfileImage(id, image);
              if (res === "error") {
                toast.error("There was an error editing your profile.", {
                  id: "remove-profile-image",
                });
              } else {
                toast.success("Your profile image has been removed.", {
                  id: "remove-profile-image",
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
