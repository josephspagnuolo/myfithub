"use client";

import { signIn } from "next-auth/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import LoadingDots from "@/components/loading-dots";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

export default function GitHubSigninButton({
  type, working, doWorking
}: {
  type: "login" | "register";
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
    <div className="flex w-full">
      <button
        disabled={working}
        className={`${working ? "cursor-not-allowed hover:bg-black" : ""} ${loading
          ? "bg-stone-900 border border-stone-900 cursor-not-allowed hover:bg-stone-900"
          : "bg-black hover:bg-zinc-800 border border-zinc-800"
          } h-10 w-full flex items-center justify-center rounded-md text-md font-semibold transition-all`}
        onClick={(e) => {
          e.preventDefault();
          setLoading(true);
          doWorking(true);
          signIn("google");
          toast.loading("Signing in...");
        }}
      >
        {loading ? (
          <>
            <FcGoogle size={20} className="mr-2" /><LoadingDots color="#808080" />
          </>
        ) : (
          <>
            <FcGoogle size={20} className="mr-2" /><span>{type === "login" ? "Log in with Google" : "Sign up with Google"}</span>
          </>
        )}
      </button>
    </div>
  );
}