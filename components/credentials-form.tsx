"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { signIn } from "next-auth/react";
import LoadingDots from "@/components/loading-dots";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CredentialsForm({
  type, working, doWorking
}: {
  type: "login" | "register";
  working: boolean;
  doWorking: Dispatch<SetStateAction<boolean>>;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  function validate() {
    if (type === "register") {
      const input = document.getElementById("password");
      const validityState = (input as HTMLInputElement).validity;
      (input as HTMLInputElement).setCustomValidity("");
      if (((input as HTMLInputElement).value).length < 1) {
        (input as HTMLInputElement).setCustomValidity("Please fill out this field.");
      } else if (((input as HTMLInputElement).value).includes(' ')) {
        (input as HTMLInputElement).setCustomValidity("Password cannot include spaces.");
      } else if (((input as HTMLInputElement).value).length < 8) {
        (input as HTMLInputElement).setCustomValidity("Password must be at least 8 characters and include a number.");
      } else if (!(/[0-9]/.test((input as HTMLInputElement).value))) {
        (input as HTMLInputElement).setCustomValidity("Password must be at least 8 characters and include a number.");
      } else {
        (input as HTMLInputElement).setCustomValidity("");
      }
      //(input as HTMLInputElement).reportValidity();
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        doWorking(true);
        if (type === "login") {
          signIn("credentials", {
            redirect: false,
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value,
            // @ts-ignore
          }).then(({ error }) => {
            if (error) {
              setLoading(false);
              doWorking(false);
              toast.error(error);
            } else {
              const toastId = toast.loading("Signing in...", {
                style: { minWidth: "230px" }
              });
              setTimeout(() => {
                toast.success("Signed in successfully!", {
                  id: toastId,
                });
                router.push("/dashboard");
                router.refresh();
              }, 1000);
            }
          });
        } else {
          fetch("/api/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: e.currentTarget.nametext.value,
              email: e.currentTarget.email.value,
              password: e.currentTarget.password.value,
            }),
          }).then(async (res) => {
            setLoading(false);
            doWorking(false);
            if (res.status === 200) {
              toast.success("Account created! Please check your email for a verification link.", { duration: 10000 });
              setTimeout(() => {
                router.push("/login");
              }, 2000);
            } else {
              const { error } = await res.json();
              toast.error(error);
            }
          });
        }
      }}
      className="flex flex-col space-y-3 px-4 py-5 pt-2 sm:px-16"
    >
      {type === "register" ? (
        <div>
          <label
            htmlFor="nametext"
            className="block text-xs text-zinc-400"
          >
            Name
          </label>
          <input
            id="nametext"
            name="nametext"
            type="text"
            required
            className="mt-1 block w-full appearance-none rounded-md border border-zinc-600 bg-black px-3 py-2 placeholder-zinc-400 shadow-sm focus:border-zinc-400 focus:outline-none focus:ring-black sm:text-sm"
          />
        </div>
      ) : (
        ""
      )}
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
          className="mt-1 block w-full appearance-none rounded-md border border-zinc-600 bg-black px-3 py-2 placeholder-zinc-400 shadow-sm focus:border-zinc-400 focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <div>
        <div className="flex justify-between">
          <label
            htmlFor="password"
            className="block text-xs text-zinc-400"
          >
            Password
          </label>
          <label
            className="block text-xs text-zinc-400 underline cursor-pointer"
            onClick={() => setVisible(!visible)}
          >
            {visible ? "Hide Password" : "Show Password"}
          </label>
        </div>
        <input
          id="password"
          name="password"
          type={visible ? "text" : "password"}
          required
          onChange={validate}
          className="mt-1 block w-full appearance-none rounded-md border border-zinc-600 bg-black px-3 py-2 placeholder-zinc-400 shadow-sm focus:border-zinc-400 focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <button
        type="submit"
        disabled={working}
        className={`${working ? "cursor-not-allowed" : ""} ${loading
          ? "bg-[#1a1a1c] border border-[#1a1a1c] cursor-not-allowed"
          : "bg-sky-800 hover:bg-sky-900 hover:text-zinc-400 border border-black"
          } h-10 w-full flex items-center justify-center rounded-md text-md font-semibold transition-all focus:outline-none`}
      >
        {loading ? (
          <LoadingDots color="#808080" />
        ) : (
          <p>{type === "login" ? "Sign In" : "Sign Up"}</p>
        )}
      </button>
      {type === "login" ? (
        <>
          <p className="text-center text-sm text-zinc-400">
            <Link href="/forgot-password" className="hover:underline">
              Forgot your password?
            </Link>
          </p>
          <p className="text-center text-sm text-zinc-400">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-zinc-200 hover:underline">
              Sign up
            </Link>{" "}
            for free.
          </p>
        </>
      ) : (
        <>
          <p className="text-center text-xs text-zinc-400">
            By signing up, you agree to our{" "}
            <Link href="/terms" className="font-semibold text-zinc-200 hover:underline">
              Terms of Service
            </Link>
            {" and "}
            <Link href="/privacy" className="font-semibold text-zinc-200 hover:underline whitespace-nowrap">
              Privacy Policy
            </Link>{"."}
          </p>
          <p className="text-center text-sm text-zinc-400">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-zinc-200 hover:underline">
              Sign in
            </Link>{" "}
            instead.
          </p>
        </>
      )}
    </form>
  );
}
