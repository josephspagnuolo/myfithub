"use client";

import { useState } from "react";
import LoadingDots from "@/components/loading-dots";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Input from "@mui/joy/Input";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function PasswordResetForm({ token }: { token: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  function validate() {
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

  return (
    <form
      className="flex flex-col space-y-3 pb-1"
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        const toastId = toast.loading("Resetting...");
        fetch(`/api/password-reset/${token}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: e.currentTarget.password.value,
          }),
        }).then(async (res) => {
          if (res.status === 200) {
            toast.success("You have successfully reset your password", {
              id: toastId,
              duration: 10000,
            });
            router.push("/login");
          } else {
            const { error } = await res.json();
            toast.error(error, {
              id: toastId,
            });
          }
        });
      }}
    >
      <div>
        <div className="flex">
          <label htmlFor="password" className="block text-xs text-zinc-400">
            Password
          </label>
        </div>
        <Input
          id="password"
          name="password"
          type={visible ? "text" : "password"}
          required
          disabled={loading}
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
  );
}
