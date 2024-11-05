"use client";

import { useState } from "react";
import Image from "next/image";
import SignOut from "@/components/sign-out";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Link from "next/link";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FaArrowTrendUp } from "react-icons/fa6";
import { LuSettings } from "react-icons/lu";
import LogoSVG from "@/components/logo-svg";

export default function UserDropdown({
  user,
}: {
  user: {
    id: string;
  } & {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <>
      <ClickAwayListener onClickAway={closeDropdown}>
        <div className="relative inline-block">
          <button
            onClick={toggleDropdown}
            className="relative z-50 overflow-clip rounded-full transition-all sm:hover:opacity-75"
          >
            <Image
              src={user.image ? user.image : "/user.png"}
              alt="Profile Image"
              width={38}
              height={38}
              className="h-[38px] w-[38px] rounded-full object-cover object-center"
            />
          </button>
          <div
            className={`${isOpen ? "absolute -right-px top-12 z-50 flex w-60 flex-col justify-center" : "hidden"}`}
          >
            <div className="z-10 flex flex-col divide-y divide-zinc-800 rounded-lg border border-zinc-800 bg-black">
              <div className="p-3.5">
                <p className="text-sm text-zinc-400">Signed in as</p>
                <span>{user.name}</span>
              </div>
              <div onClick={closeDropdown} className="p-1">
                <Link
                  href="/dashboard"
                  className="flex items-center space-x-2 rounded-md p-2 text-center transition-all hover:bg-zinc-800"
                >
                  <MdOutlineSpaceDashboard size={20} />
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/dashboard/workout/all"
                  className="flex items-center space-x-2 rounded-md p-2 text-center transition-all hover:bg-zinc-800"
                >
                  <LogoSVG className="h-5 w-5" />
                  <span>Workouts</span>
                </Link>
                <Link
                  href="/dashboard/progress"
                  className="flex items-center space-x-2 rounded-md p-2 text-center transition-all hover:bg-zinc-800"
                >
                  <FaArrowTrendUp size={18} className="ml-px mt-px" />
                  <span className="ml-px">Progress</span>
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center space-x-2 rounded-md p-2 text-center transition-all hover:bg-zinc-800"
                >
                  <LuSettings size={19} className="ml-px mt-px" />
                  <span>Settings</span>
                </Link>
              </div>
              <div className="p-1">
                <SignOut />
              </div>
            </div>
          </div>
        </div>
      </ClickAwayListener>
      <div
        className={`${isOpen ? "fixed bottom-0 left-0 right-0 top-0 z-40 bg-zinc-950/75 backdrop-blur-0" : "hidden"}`}
      ></div>
    </>
  );
}
