"use client";

import { useState } from "react";
import LoadingDots from "@/components/loading-dots";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Card from "@/components/card";
import Input from "@mui/joy/Input";
import { createWorkout } from "@/lib/actions";

export default function CreateWorkout() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <div className="flex w-full max-w-md">
      <Card>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            toast.remove("create-workout");
            toast.loading("Creating...", {
              id: "create-workout",
            });
            const res = await createWorkout(e.currentTarget.content.value);
            if (res === "error") {
              toast.error("There was an error creating your workout.", {
                id: "create-workout",
              });
              setLoading(false);
            } else {
              toast.success("Great workout!", {
                id: "create-workout",
              });
              router.push(`/dashboard/workout/${res}`);
              router.refresh();
            }
          }}
          className="flex flex-col space-y-4 py-1"
        >
          <div>
            <label htmlFor="content" className="block text-xs text-zinc-400">
              Workout Name
            </label>
            <Input
              id="content"
              name="content"
              type="text"
              placeholder="Chest Day"
              required
              disabled={loading}
              slotProps={{
                input: {
                  maxLength: 22,
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
            {loading ? <LoadingDots color="#808080" /> : <p>Create Workout</p>}
          </button>
        </form>
      </Card>
    </div>
  );
}
