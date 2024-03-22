"use client";

import { useState } from "react";
import LoadingDots from "@/components/loading-dots";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { listOfAllExercises } from "./list-of-all-exercises";
import Autocomplete from "@mui/joy/Autocomplete";

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
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl shadow-xl bg-[#292929]">
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
          <Autocomplete
            required
            placeholder="Add..."
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
            }}
          />
          <button
            type="submit"
            disabled={loading}
            className={`${loading
              ? "cursor-not-allowed border-[#292929] bg-[#292929] mt-4"
              : "border-black bg-sky-800 text-gray-300 hover:bg-sky-900"} flex mt-4 h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
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

