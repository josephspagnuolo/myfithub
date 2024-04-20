"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import LoadingDots from "./loading-dots";
import { useState } from "react";

export default function SignOut() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <button
      className={`${loading ? "border-transparent hover:border-transparent" : ""} text-stone-200 hover:text-stone-400 transition-all rounded-md border border-stone-200 hover:border-stone-400 p-1.5 pt-1`}
      disabled={loading}
      onClick={async () => {
        setLoading(true);
        const data = await signOut({ redirect: false, callbackUrl: "/" });
        toast.loading("Signing out...", {
          id: "sign-out",
          style: { minWidth: "230px" }
        });
        setTimeout(() => {
          toast.success("Signed out successfully!", {
            id: "sign-out",
          });
          router.push(data.url);
          router.refresh();
        }, 1000);
      }}
    >
      {loading ? (
        <LoadingDots color="#808080" />
      ) : (
        <p>Sign out</p>
      )}
    </button>
  );
}
