"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { signIn } from "next-auth/react";
import LoadingDots from "@/components/loading-dots";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Input from "@mui/joy/Input";
import { CssVarsProvider } from "@mui/joy";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function CredentialsForm({
  type,
  working,
  doWorking,
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
      if ((input as HTMLInputElement).value.length < 1) {
        (input as HTMLInputElement).setCustomValidity(
          "Please fill out this field.",
        );
      } else if ((input as HTMLInputElement).value.includes(" ")) {
        (input as HTMLInputElement).setCustomValidity(
          "Password cannot include spaces.",
        );
      } else if ((input as HTMLInputElement).value.length < 8) {
        (input as HTMLInputElement).setCustomValidity(
          "Password must be at least 8 characters and include a number.",
        );
      } else if (!/[0-9]/.test((input as HTMLInputElement).value)) {
        (input as HTMLInputElement).setCustomValidity(
          "Password must be at least 8 characters and include a number.",
        );
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
          const toastId = toast.loading("Logging in...");
          signIn("credentials", {
            redirect: false,
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value,
            // @ts-ignore
          }).then(({ error }) => {
            if (error) {
              setLoading(false);
              doWorking(false);
              toast.error(error, {
                id: toastId,
              });
            } else {
              toast.success("Logged in successfully!", {
                id: toastId,
              });
              router.push("/dashboard");
              router.refresh();
            }
          });
        } else {
          const toastId = toast.loading("Registering...");
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
              toast.success(
                "Account created! Please check your email for a verification link.",
                {
                  id: toastId,
                  duration: 10000,
                },
              );
              router.push("/login");
            } else {
              const { error } = await res.json();
              toast.error(error, {
                id: toastId,
              });
            }
          });
        }
      }}
      className="flex flex-col space-y-3"
    >
      {type === "register" ? (
        <div>
          <label htmlFor="nametext" className="block text-xs text-zinc-400">
            Name
          </label>
          <Input
            id="nametext"
            name="nametext"
            type="text"
            placeholder="Your Name"
            required
            disabled={working}
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
            className="mt-1 w-full border border-zinc-800 shadow-none focus-within:outline-none focus-within:ring-2 focus-within:ring-sky-600"
          />
        </div>
      ) : (
        ""
      )}
      <div>
        <label htmlFor="email" className="block text-xs text-zinc-400">
          Email Address
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="someone@example.com"
          autoComplete="email"
          required
          disabled={working}
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
          className="mt-1 w-full border border-zinc-800 shadow-none focus-within:outline-none focus-within:ring-2 focus-within:ring-sky-600"
        />
      </div>
      <div>
        <CssVarsProvider defaultMode="dark" />
        {type === "login" ? (
          <div className="flex justify-between">
            <label htmlFor="password" className="text-xs text-zinc-400">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs text-zinc-400 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        ) : (
          <div className="flex">
            <label htmlFor="password" className="text-xs text-zinc-400">
              Password
            </label>
          </div>
        )}
        <Input
          id="password"
          name="password"
          type={visible ? "text" : "password"}
          required
          disabled={working}
          onChange={validate}
          sx={{
            "--Input-focusedThickness": "0rem",
            "--Input-placeholderOpacity": 0.25,
            "--Input-paddingInline": "6.5px",
            pl: "12px",
            height: "40px",
            backgroundColor: "black",
            "--tw-border-opacity": 1,
            borderColor: "rgb(39 39 42 / var(--tw-border-opacity))",
            "--tw-shadow": "0 0 #0000",
            "--tw-shadow-colored": "0 0 #0000",
            boxShadow:
              "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)",
          }}
          endDecorator={
            <button
              type="button"
              className="mt-[0.75px] rounded-md p-1 px-1.5 text-zinc-50 hover:bg-zinc-800"
              onClick={() => {
                setVisible(!visible);
                const input = document.getElementById(
                  "password",
                ) as HTMLInputElement;
                setTimeout(() => {
                  input.focus();
                  const valueLength = input.value.length;
                  input.setSelectionRange(valueLength, valueLength);
                }, 0);
              }}
            >
              {visible ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          }
          className="mt-1 w-full focus-within:outline-none focus-within:ring-2 focus-within:ring-sky-600"
        />
      </div>
      <button
        type="submit"
        disabled={working}
        className={`${working ? "cursor-not-allowed hover:bg-sky-600" : ""} ${
          loading
            ? "cursor-not-allowed border border-zinc-900 bg-zinc-900"
            : "border border-black bg-sky-600 hover:bg-sky-700"
        } text-md flex h-10 w-full items-center justify-center rounded-md font-semibold transition-all`}
      >
        {loading ? (
          <LoadingDots color="#808080" />
        ) : (
          <p>{type === "login" ? "Sign In" : "Sign Up"}</p>
        )}
      </button>
      <p className="text-center text-xs text-zinc-400">
        By continuing, you agree to our{" "}
        <Link
          href="/terms"
          className="font-semibold text-zinc-200 hover:underline"
        >
          Terms of Service
        </Link>
        {" and "}
        <Link
          href="/privacy"
          className="whitespace-nowrap font-semibold text-zinc-200 hover:underline"
        >
          Privacy Policy
        </Link>
        {"."}
      </p>
      {type === "login" ? (
        <p className="text-center text-sm text-zinc-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-zinc-200 hover:underline"
          >
            Sign up
          </Link>{" "}
          for free.
        </p>
      ) : (
        <p className="text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-zinc-200 hover:underline"
          >
            Log in
          </Link>{" "}
          instead.
        </p>
      )}
    </form>
  );
}
