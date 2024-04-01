"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function SignOut() {
  const router = useRouter();
  return (
    <button
      className="text-stone-200 hover:text-stone-400 transition-all rounded-md border border-stone-200 hover:border-stone-400 p-1.5 pt-1"
      onClick={async () => {
        const data = await signOut({ redirect: false, callbackUrl: "/" });
        const toastId = toast.loading("Signing out...", {
          style: { minWidth: "230px" }
        });
        setTimeout(() => {
          toast.success("Signed out successfully!", {
            id: toastId,
          });
          router.push(data.url);
          router.refresh();
        }, 1000);
      }}
    >
      Sign out
    </button>
  );
}
