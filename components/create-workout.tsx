"use client";

import { useState } from "react";
import LoadingDots from "@/components/loading-dots";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateWorkout() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <>
      <Link className="absolute top-4 flex overflow-y-clip z-50" href="/dashboard">
        <div className="sm:scale-y-[2] sm:scale-x-150 sm:-translate-y-[2.5px] sm:mr-0.5">←</div>
        <span>&nbsp;Back to dashboard</span>
      </Link>
      <div className="w-full max-w-md overflow-hidden rounded-2xl shadow-xl bg-[#292929]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            fetch("/api/workout", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                content: e.currentTarget.content.value,
              }),
            }).then(async (res) => {
              if (res.status === 200) {
                const { workout } = await res.json()
                toast.success("Great workout!");
                setTimeout(() => {
                  router.push(`/dashboard/workout/${workout.id}`);
                  router.refresh();
                }, 2000);
              } else {
                const { error } = await res.json();
                toast.error("There was an error...");
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
              Workout Name
            </label>
            <input
              id="content"
              name="content"
              type="content"
              placeholder="Chest Day"
              maxLength={22}
              required
              className="mt-1 block w-full appearance-none rounded-md border border-gray-600 bg-black px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-400 focus:outline-none focus:ring-black sm:text-sm placeholder-opacity-25" />
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
              <p>Create Workout</p>
            )}
          </button>
        </form>
      </div>
    </>
  );
}

