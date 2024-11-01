"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import LoadingDots from "@/components/loading-dots";
import { useState } from "react";
import { TbLogout2 } from "react-icons/tb";

export default function SignOut() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <button
      className={`${loading ? "" : "hover:bg-zinc-800"} flex w-full items-center rounded-md p-2 text-center transition-all`}
      disabled={loading}
      onClick={async () => {
        setLoading(true);
        const toastId = toast.loading("Signing out...");
        const data = await signOut({ redirect: false, callbackUrl: "/" });
        router.push(data.url);
        router.refresh();
        toast.success("Signed out successfully!", {
          id: toastId,
        });
      }}
    >
      <div className="flex h-[22px] items-center">
        {loading ? (
          <LoadingDots color="#808080" />
        ) : (
          <div className="flex items-center space-x-2">
            <TbLogout2 size={19} strokeWidth={2.4} className="mt-px" />
            <p>Sign out</p>
          </div>
        )}
      </div>
    </button>
  );
}
