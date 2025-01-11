"use client";

import { signIn } from "next-auth/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BsGithub } from "react-icons/bs";
import LoadingDots from "@/components/loading-dots";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

export default function GitHubSigninButton({
  type,
  working,
  doWorking,
}: {
  type: "login" | "register";
  working: boolean;
  doWorking: Dispatch<SetStateAction<boolean>>;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    router.prefetch("/dashboard");
    if (error === "Callback") {
      toast.error("Log in unsuccessful", { id: "1" });
      setTimeout(() => {
        router.push("/login");
      }, 100);
    }
  }, [error, router]);
  return (
    <div className="flex w-full">
      <button
        disabled={working || loading}
        className={`${
          loading
            ? "cursor-not-allowed border border-zinc-900 bg-zinc-900"
            : `border border-zinc-800 bg-black ${working ? "cursor-not-allowed" : "hover:bg-zinc-800"}`
        } text-md flex h-10 w-full items-center justify-center rounded-md font-semibold transition-all`}
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
            <BsGithub size={20} className="mr-2" />
            <LoadingDots color="#808080" />
          </>
        ) : (
          <>
            <BsGithub size={20} className="mr-2" />
            <span>
              {type === "login" ? "Log in with GitHub" : "Sign up with GitHub"}
            </span>
          </>
        )}
      </button>
    </div>
  );
}
