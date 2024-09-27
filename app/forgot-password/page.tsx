"use client";

import { useState } from "react";
import LoadingDots from "@/components/loading-dots";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <main className="flex grow items-center justify-center">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-zinc-800 shadow-xl bg-stone-900 mx-3">
        <div className="flex flex-col items-center justify-center space-y-2 border-b border-zinc-800 px-4 py-4 pt-5 text-center sm:px-16">
          <Link href="/">
            <Image
              src="/logo.png"
              priority
              alt="MyFitHub Logo"
              className="h-10 w-10 rounded-full"
              width={20}
              height={20}
            />
          </Link>
          <h3 className="text-xl font-semibold">Forgot Password</h3>
          <p className="text-sm text-zinc-400">
            Enter your email address to reset your password
          </p>
        </div>
        <form className="flex flex-col space-y-3 p-6"
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            fetch("/api/forgot-password", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: e.currentTarget.email.value,
              }),
            }).then(async (res) => {
              if (res.status === 200) {
                toast.success("If an account exists with that email, you will receive a password reset link.", { duration: 10000 });
                router.push("/login");
              } else {
                const { error } = await res.json();
                toast.error("There was an error...");
              }
            });
          }}>
          <div>
            <label
              htmlFor="email"
              className="block text-xs text-zinc-400"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 block w-full appearance-none rounded-md border border-zinc-800 bg-black px-3 py-2 placeholder-zinc-400 shadow-sm focus:border-zinc-400 focus:outline-none focus:ring-black sm:text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`${loading
              ? "bg-stone-900 border border-stone-900 cursor-not-allowed"
              : "bg-sky-600 hover:bg-sky-700 border border-black"
              } h-10 w-full flex items-center justify-center rounded-md text-md font-semibold transition-all`}
          >
            {loading ? (
              <LoadingDots color="#808080" />
            ) : (
              <p>Submit</p>
            )}
          </button>
        </form>
      </div>
      <Link className="absolute top-14 flex overflow-y-clip" href="/login">
        <div className="sm:scale-y-[2] sm:scale-x-150 sm:-translate-y-[2.5px] sm:mr-0.5">←</div>
        <span>&nbsp;Back to login</span>
      </Link>
    </main>
  );
}
