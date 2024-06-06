"use client";

import { useState } from "react";
import LoadingDots from "@/components/loading-dots";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { listOfAllExercises } from "./list-of-all-exercises";
import Autocomplete from "@mui/joy/Autocomplete";
import { CssVarsProvider } from "@mui/joy";

export default function AddExercise({
  id, currentExsList
}: {
  id: string;
  currentExsList: string[];
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [value, setValue] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="w-full max-w-md overflow-hidden rounded-2xl shadow-xl bg-[#1a1a1c]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            fetch(`/api/workout/${id}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: value,
              }),
            }).then(async (res) => {
              if (res.status === 200) {
                setValue(null)
                const { exercise } = await res.json()
                setTimeout(() => {
                  router.refresh();
                  toast.success("Great exercise!");
                  setLoading(false);
                }, 2000);
              } else {
                const { error } = await res.json();
                toast.error("There was an error...");
              }
            });
          }}
          className="flex flex-col px-4 py-5"
        >
          <CssVarsProvider defaultMode="dark" />
          <Autocomplete
            required
            placeholder="Add..."
            variant="plain"
            value={value}
            onChange={(event: any, newValue: React.SetStateAction<string | null>) => {
              setValue(newValue);
              setIsOpen(false);
            }}
            inputValue={inputValue}
            onInputChange={(event: any, newInputValue: React.SetStateAction<string>) => {
              setInputValue(newInputValue);
              newInputValue === "" ? setIsOpen(false) : setIsOpen(true);
              if (value !== null) {
                setValue(null);
                setTimeout(() => {
                  setInputValue(newInputValue);
                  newInputValue === "" ? setIsOpen(false) : setIsOpen(true);
                }, 1);
              }
            }}
            options={listOfAllExercises}
            getOptionDisabled={(option) =>
              currentExsList.includes(option.toString())
            }
            open={isOpen}
            sx={{
              '&::before': {
                transform: 'scaleX(0)',
              },
              input: {
                "&::placeholder": {
                  opacity: 0.25
                }
              }
            }}
            className="relative z-0 border border-zinc-600 bg-black focus-within:border-zinc-400 focus-within:outline-none focus-within:ring-black"
          />
          <button
            type="submit"
            disabled={loading}
            className={`${loading
              ? "bg-[#1a1a1c] border border-[#1a1a1c] cursor-not-allowed"
              : "bg-sky-800 hover:bg-sky-900 hover:text-zinc-400 border border-black"
              } h-10 w-full flex items-center justify-center rounded-md text-md font-semibold transition-all focus:outline-none mt-4`}
          >
            {loading ? (
              <LoadingDots color="#808080" />
            ) : (
              <p>Add Exercise</p>
            )}
          </button>
        </form>
      </div>
    </>
  );
}

