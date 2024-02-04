"use client";

import { signIn } from "next-auth/react";
import { Dispatch, SetStateAction, useState } from "react";
import { BsGithub } from "react-icons/bs";
import LoadingDots from "./loading-dots";

export default function GitHubSigninButton({
  working, doWorking
}: {
  working: boolean;
  doWorking: Dispatch<SetStateAction<boolean>>;
}) {
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex px-4 pb-2 sm:px-16">
      <button disabled={working} className={`${working ? "cursor-not-allowed" : ""} ${loading
        ? "cursor-not-allowed border-[#292929] bg-[#292929]"
        : "border-black bg-black text-gray-300"
        } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
        onClick={(e) => {
          e.preventDefault();
          setLoading(true);
          doWorking(true);
          signIn("github");
        }}
      >
        {loading ? (
          <>
            <BsGithub size={20} className="mr-2" /><LoadingDots color="#808080" />
          </>
        ) : (
          <>
            <BsGithub size={20} className="mr-2" /><span>Continue with GitHub</span>
          </>
        )}
      </button>
    </div>
  );
}