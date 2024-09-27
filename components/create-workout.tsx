"use client";

import { useState } from "react";
import LoadingDots from "@/components/loading-dots";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CreateWorkout() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <>
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-zinc-800 shadow-xl bg-stone-900">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            const toastId = toast.loading("Creating...");
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
                toast.success("Great workout!", {
                  id: toastId,
                });
                router.push(`/dashboard/workout/${workout.id}`);
              } else {
                const { error } = await res.json();
                toast.error(error, {
                  id: toastId,
                });
              }
            });
          }}
          className="flex flex-col space-y-4 px-4 py-8 sm:px-16"
        >
          <div>
            <label
              htmlFor="content"
              className="block text-xs text-zinc-400"
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
              className="mt-1 block w-full appearance-none rounded-md border border-zinc-800 bg-black px-3 py-2 placeholder-zinc-400 shadow-sm focus:border-zinc-400 focus:outline-none focus:ring-black sm:text-sm placeholder-opacity-25" />
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
              <p>Create Workout</p>
            )}
          </button>
        </form>
      </div>
    </>
  );
}

