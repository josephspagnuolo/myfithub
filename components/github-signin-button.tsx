"use client";

import { signIn } from "next-auth/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BsGithub } from "react-icons/bs";
import LoadingDots from "./loading-dots";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

export default function GitHubSigninButton({
  working, doWorking
}: {
  working: boolean;
  doWorking: Dispatch<SetStateAction<boolean>>;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  useEffect(() => {
    if (error === "Callback") {
      toast.error("Log in unsuccessful", { id: "1" });
      setTimeout(() => {
        router.push("/login");
      }, 100);
    }
  }, [error, router]);
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
          toast.loading("Signing in...");
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