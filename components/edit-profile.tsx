"use client";

import { MdEdit } from "react-icons/md";
import { useState, useRef, ChangeEvent, Dispatch, SetStateAction } from "react";
import Modal from "@mui/joy/Modal";
import LoadingDots from "@/components/loading-dots";
import { editProfile, removeProfileImage } from "@/lib/actions";
import toast from "react-hot-toast";
import Image from "next/image";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { FaRegTrashAlt } from "react-icons/fa";
import { HiUpload } from "react-icons/hi";

export default function EditProfileButton({
  id,
  image,
}: {
  id: string;
  image: string;
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };
  return (
    <>
      <ClickAwayListener onClickAway={closeDropdown}>
        <div className="relative inline-block">
          <button
            type="button"
            onClick={toggleDropdown}
            className="rounded-full bg-sky-600 p-2 transition-all hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <MdEdit size={20} />
          </button>
          <div
            className={`${isDropdownOpen ? "absolute bottom-10 left-0 z-50 flex w-36 flex-col justify-center" : "hidden"}`}
          >
            <div className="z-10 flex flex-col overflow-clip rounded-md border border-zinc-800 bg-black p-1">
              <UploadImageButton
                id={id}
                image={image}
                setDropdownClosed={setIsDropdownOpen}
              />
              <RemoveImageButton
                id={id}
                image={image}
                setDropdownClosed={setIsDropdownOpen}
              />
            </div>
          </div>
        </div>
      </ClickAwayListener>
    </>
  );
}

function UploadImageButton({
  id,
  image,
  setDropdownClosed,
}: {
  id: string;
  image: string;
  setDropdownClosed: Dispatch<SetStateAction<boolean>>;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
      <button
        type="button"
        className="flex flex-row items-center rounded-[5px] p-2.5 py-1.5 transition-all hover:bg-zinc-800"
        onClick={() => {
          inputRef.current?.click();
          setDropdownClosed(false);
        }}
      >
        <HiUpload size={20} />
        <span className="ml-2 -translate-y-px text-base font-normal">
          Upload
        </span>
      </button>
      <Modal
        disableRestoreFocus
        open={open}
        onClose={() => {
          if (!loading) {
            setOpen(false);
            setPreview(null);
          }
        }}
        className="flex items-center justify-center bg-black/50 backdrop-blur-0"
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
              if (file) {
                const formData = new FormData();
                formData.append("file", file);
                await editProfile(id, image, formData);
              }
              toast.success("Your profile details have been saved.");
              setLoading(false);
              setOpen(false);
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

function RemoveImageButton({
  id,
  image,
  setDropdownClosed,
}: {
  id: string;
  image: string;
  setDropdownClosed: Dispatch<SetStateAction<boolean>>;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className="flex flex-row items-center rounded-[5px] p-2.5 py-1.5 text-red-600 transition-all hover:bg-zinc-800"
        onClick={() => {
          setOpen(true);
          setDropdownClosed(false);
        }}
      >
        <FaRegTrashAlt size={20} strokeWidth={8} className="mt-px" />
        <span className="ml-2 text-base font-[480]">Remove</span>
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
              This action cannot be undone. This will permanently delete the
              image associated with your profile.
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
              onClick={() => {
                removeProfileImage(id, image);
                toast.success("Profile image removed.");
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
