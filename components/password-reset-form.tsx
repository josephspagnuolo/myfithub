"use client";

import { useState } from "react";
import LoadingDots from "@/components/loading-dots";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function PasswordResetForm({
  token
}: {
  token: string;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  function validate() {
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

  return (
    <form className="flex flex-col space-y-3 px-4 py-5 sm:px-16"
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
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
            toast.success("You have successfully reset your password", { duration: 10000 });
            router.push("/login");
          } else {
            const { error } = await res.json();
            toast.error("There was an error...");
          }
        });
      }}>
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
          ? "bg-[#292929] border border-[#292929] cursor-not-allowed"
          : "bg-sky-800 hover:bg-sky-900 text-gray-300 hover:text-gray-400 border border-black"
          } h-10 w-full flex items-center justify-center rounded-md text-md font-semibold transition-all focus:outline-none`}
      >
        {loading ? (
          <LoadingDots color="#808080" />
        ) : (
          <p>Submit</p>
        )}
      </button>
    </form>
  );
}