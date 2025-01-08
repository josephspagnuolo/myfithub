"use client";

import { useState } from "react";
import LoadingDots from "@/components/loading-dots";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Card from "@/components/card";
import Input from "@mui/joy/Input";
import { CssVarsProvider } from "@mui/joy";

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
              className="flex flex-col space-y-3"
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
                <CssVarsProvider defaultMode="dark" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="someone@example.com"
                  autoComplete="email"
                  required
                  disabled={loading}
                  slotProps={{
                    input: {
                      inputMode: "email",
                    },
                  }}
                  sx={{
                    "--Input-focusedThickness": "0rem",
                    "--Input-placeholderOpacity": 0.25,
                    height: "40px",
                    backgroundColor: "black",
                    "--tw-border-opacity": 1,
                    borderColor: "rgb(39 39 42 / var(--tw-border-opacity))",
                    "--tw-shadow": "0 0 #0000",
                    "--tw-shadow-colored": "0 0 #0000",
                    boxShadow:
                      "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)",
                  }}
                  className="mt-1 w-full focus-within:outline-none focus-within:ring-2 focus-within:ring-sky-600"
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
