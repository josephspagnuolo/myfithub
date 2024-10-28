"use client";

import { useState } from "react";
import LoadingDots from "@/components/loading-dots";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Card from "@/components/card";

export default function CreateWorkout() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <div className="flex w-full max-w-md">
      <Card>
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
                const { workout } = await res.json();
                toast.success("Great workout!", {
                  id: toastId,
                });
                router.push(`/dashboard/workout/${workout.id}`);
                router.refresh();
              } else {
                const { error } = await res.json();
                toast.error(error, {
                  id: toastId,
                });
              }
            });
          }}
          className="flex flex-col space-y-4 py-1"
        >
          <div>
            <label htmlFor="content" className="block text-xs text-zinc-400">
              Workout Name
            </label>
            <input
              id="content"
              name="content"
              type="content"
              placeholder="Chest Day"
              maxLength={22}
              required
              className="mt-1 block w-full appearance-none rounded-md border border-zinc-800 bg-black px-3 py-2 placeholder-zinc-400 placeholder-opacity-25 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-600 sm:text-sm"
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
            {loading ? <LoadingDots color="#808080" /> : <p>Create Workout</p>}
          </button>
        </form>
      </Card>
    </div>
  );
}
