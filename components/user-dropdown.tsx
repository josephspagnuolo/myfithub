"use client";

import { useState } from 'react';
import Image from "next/image";
import SignOut from './sign-out';
import ClickAwayListener from '@mui/material/ClickAwayListener';

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
          <Image
            src={user.image ? user.image : "/user.png"}
            alt="User Image"
            width={38}
            height={38}
            className="rounded-full cursor-pointer sm:hover:opacity-75 transition-all relative z-50"
            onClick={toggleDropdown}
          />
          <div className={`${isOpen ? 'absolute top-12 -right-px flex justify-center flex-col w-60 z-50' : 'hidden'}`}>
            <div className="flex flex-col p-4 bg-[#1a1a1c] rounded-lg space-y-2 z-10">
              <div className="text-center">
                <p className="text-zinc-400 text-sm">
                  Signed in as
                </p>
                <span>{user.name}</span>
              </div>
              <SignOut />
            </div>
          </div>
        </div>
      </ClickAwayListener >
      <div className={`${isOpen ? 'fixed top-0 right-0 left-0 bottom-0 z-40 backdrop-blur-md bg-zinc-400/[0.28]' : 'hidden'}`}></div>
    </>
  );
};
