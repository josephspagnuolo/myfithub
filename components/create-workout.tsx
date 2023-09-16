"use client";

import { useState } from "react";
import LoadingDots from "@/components/loading-dots";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CreateWorkout() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <><form
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        fetch("/api/auth/workout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: e.currentTarget.content.value,
          }),
        }).then(async (res) => {
          if (res.status === 200) {
            toast.success("Great workout!");
            setTimeout(() => {
              setLoading(false);
              router.refresh();
              router.replace("/protected");
            }, 2000);
          } else {
            const { error } = await res.json();
            toast.error(error);
          }
        });
      }}
      className="flex flex-col space-y-4 px-4 py-8 sm:px-16"
    >
      <div>
        <label
          htmlFor="content"
          className="block text-xs text-gray-400"
        >
          Workout Content
        </label>
        <input
          id="content"
          name="content"
          type="content"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-600 bg-[#191919] px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-400 focus:outline-none focus:ring-black sm:text-sm" />
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`${loading
          ? "cursor-not-allowed border-[#292929] bg-[#292929]"
          : "border-black bg-sky-800 text-gray-300 hover:bg-sky-900"} flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
      >
        {loading ? (
          <LoadingDots color="#808080" />
        ) : (
          <p>Create Workout</p>
        )}
      </button>
    </form>
      <a href="/protected">← Back to dashboard</a></>
  );
}

