"use client";
import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <button
      className="text-stone-400 hover:text-stone-200 transition-all rounded-md border p-1.5 pt-1"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      Sign out
    </button>
  );
}
