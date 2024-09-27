"use client";

import { useState } from 'react';
import Image from "next/image";
import SignOut from '@/components/sign-out';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Link from 'next/link';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { FaArrowTrendUp } from "react-icons/fa6";
import { LuSettings } from "react-icons/lu";
import LogoSVG from '@/components/logo-svg';

export default function UserDropdown({
  user
}: {
  user: {
    id: string;
  } & {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  }
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
          <button onClick={toggleDropdown} className="rounded-full overflow-clip sm:hover:opacity-75 transition-all relative z-50">
            <Image
              src={user.image ? user.image : "/user.png"}
              alt="User Image"
              width={38}
              height={38}
            />
          </button>
          <div className={`${isOpen ? 'absolute top-12 -right-px flex justify-center flex-col w-60 z-50' : 'hidden'}`}>
            <div className="flex flex-col bg-black rounded-lg z-10 border border-zinc-800 divide-y divide-zinc-800">
              <div className="p-3.5">
                <p className="text-zinc-400 text-sm">
                  Signed in as
                </p>
                <span>{user.name}</span>
              </div>
              <div onClick={closeDropdown} className="p-1">
                <Link href="/dashboard" className="flex items-center rounded-md hover:bg-zinc-800 text-center p-2 space-x-2 transition-all">
                  <MdOutlineSpaceDashboard size={20} />
                  <span>Dashboard</span>
                </Link>
                <Link href="/dashboard/workout/all" className="flex items-center rounded-md hover:bg-zinc-800 text-center p-2 space-x-2 transition-all">
                  <LogoSVG className="h-5 w-5" />
                  <span>Workouts</span>
                </Link>
                <Link href="/dashboard/progress" className="flex items-center rounded-md hover:bg-zinc-800 text-center p-2 space-x-2 transition-all">
                  <FaArrowTrendUp size={18} className="ml-px mt-px" />
                  <span className="ml-px">Progress</span>
                </Link>
                <Link href="/settings" className="flex items-center rounded-md hover:bg-zinc-800 text-center p-2 space-x-2 transition-all">
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
      </ClickAwayListener >
      <div className={`${isOpen ? 'fixed top-0 right-0 left-0 bottom-0 z-40 backdrop-blur-0 bg-zinc-950/75' : 'hidden'}`}></div>
    </>
  );
};
