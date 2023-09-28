"use client";

import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import LoadingDots from "@/components/loading-dots";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Form({ type }: { type: "login" | "register" }) {
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

  const emailInput = useCallback((inputElement: HTMLInputElement) => {
    if (inputElement && (type === "login")) {
      inputElement.focus();
      inputElement.click();
    }
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        if (type === "login") {
          signIn("credentials", {
            redirect: false,
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value,
            // @ts-ignore
          }).then(({ error }) => {
            if (error) {
              setLoading(false);
              toast.error(error);
            } else {
              router.refresh();
              router.push("/protected");
            }
          });
        } else {
          fetch("/api/auth/register", {
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
            if (res.status === 200) {
              toast.success("Account created! Redirecting to login...");
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
      className="flex flex-col space-y-4 px-4 py-8 sm:px-16"
    >
      {type === "register" ? (
        <div>
          <label
            htmlFor="nametext"
            className="block text-xs text-gray-400"
          >
            Name
          </label>
          <input
            id="nametext"
            name="nametext"
            type="text"
            required
            className="mt-1 block w-full appearance-none rounded-md border border-gray-600 bg-[#191919] px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-400 focus:outline-none focus:ring-black sm:text-sm"
          />
        </div>
      ) : (
        ""
      )}
      <div>
        <label
          htmlFor="email"
          className="block text-xs text-gray-400"
        >
          Email Address
        </label>
        <input
          ref={emailInput}
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-600 bg-[#191919] px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-400 focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <div>
        <div className="flex justify-between">
          <label
            htmlFor="password"
            className="block text-xs text-gray-400"
          >
            Password
          </label>
          <label
            className="block text-xs text-gray-400 underline cursor-pointer"
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
          className="mt-1 block w-full appearance-none rounded-md border border-gray-600 bg-[#191919] px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-400 focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`${loading
          ? "cursor-not-allowed border-[#292929] bg-[#292929]"
          : "border-black bg-sky-800 text-gray-300 hover:bg-sky-900"
          } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
      >
        {loading ? (
          <LoadingDots color="#808080" />
        ) : (
          <p>{type === "login" ? "Sign In" : "Sign Up"}</p>
        )}
      </button>
      {type === "login" ? (
        <p className="text-center text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-gray-300 hover:underline">
            Sign up
          </Link>{" "}
          for free.
        </p>
      ) : (
        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-gray-300 hover:underline">
            Sign in
          </Link>{" "}
          instead.
        </p>
      )}
    </form>
  );
}
