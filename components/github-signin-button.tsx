"use client";

import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function GitHubSigninButton() {
  const router = useRouter();
  return (
    <div>
      <button onClick={(e) => {
        e.preventDefault();
        signIn("github");
      }}>Continue with GitHub</button>
    </div>
  )
}