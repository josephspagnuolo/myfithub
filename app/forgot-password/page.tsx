"use client";

import { useState } from "react";
import LoadingDots from "@/components/loading-dots";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Card from "@/components/card";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <main className="flex grow justify-center">
      <div className="flex w-full max-w-5xl grow flex-col items-center justify-center space-y-5 p-4">
        <div className="flex w-full max-w-md">
          <Card>
            <div className="-mx-6 flex flex-col items-center justify-center space-y-2 border-b border-zinc-800 pb-3 text-center">
              <Link href="/">
                <Image
                  src="/logo-transparent.png"
                  priority
                  alt="MyFitHub Logo"
                  width={60}
                  height={34}
                  className="h-[34px] w-[60px]"
                />
              </Link>
              <h3 className="text-xl font-semibold">Forgot Password</h3>
              <p className="text-sm text-zinc-400">
                Enter your email address to reset your password
              </p>
            </div>
            <form
              className="flex flex-col space-y-3 pb-1"
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
                    toast.success(
                      "If an account exists with that email, you will receive a password reset link.",
                      { duration: 10000 },
                    );
                    router.push("/login");
                  } else {
                    const { error } = await res.json();
                    toast.error("There was an error...");
                  }
                });
              }}
            >
              <div>
                <label htmlFor="email" className="block text-xs text-zinc-400">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1 block w-full appearance-none rounded-md border border-zinc-800 bg-black px-3 py-2 placeholder-zinc-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-600 sm:text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`${
                  loading
                    ? "cursor-not-allowed border border-zinc-900 bg-zinc-900"
                    : "border border-black bg-sky-600 hover:bg-sky-700"
                } text-md flex h-10 w-full items-center justify-center rounded-md font-semibold transition-all`}
              >
                {loading ? <LoadingDots color="#808080" /> : <p>Submit</p>}
              </button>
            </form>
          </Card>
        </div>
        <Link className="absolute top-14 flex overflow-y-clip" href="/login">
          <div className="sm:mr-0.5 sm:-translate-y-[2.5px] sm:scale-x-150 sm:scale-y-[2]">
            ←
          </div>
          <span>&nbsp;Back to login</span>
        </Link>
      </div>
    </main>
  );
}
