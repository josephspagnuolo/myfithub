"use client";

import { useState } from "react";
import LoadingDots from "@/components/loading-dots";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { listOfAllExercises } from "@/lib/list-of-all-exercises";
import Autocomplete from "@mui/joy/Autocomplete";
import { CssVarsProvider } from "@mui/joy";
import Modal from '@mui/joy/Modal';
import { GoPlus } from "react-icons/go";
import Input from '@mui/joy/Input';

export default function AddExercise({
  id, currentExsList
}: {
  id: string;
  currentExsList: string[];
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [value, setValue] = useState<string | null>(null);
  const [distanceValue, setDistanceValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const submit = async () => {
    setLoading(true);
    if (value == null) {
      const input = document.getElementById("exercise");
      (input as HTMLInputElement).setCustomValidity("Please select an option.");
      (input as HTMLInputElement).reportValidity();
      input?.focus();
      setLoading(false);
      return;
    }
    if (value === "Distance Run") {
      const distanceInput = document.getElementById("distance");
      if (distanceValue === "") {
        (distanceInput as HTMLInputElement).reportValidity();
        distanceInput?.focus();
        setLoading(false);
        return;
      }
      if ((distanceInput as HTMLInputElement).validity.patternMismatch) {
        (distanceInput as HTMLInputElement).reportValidity();
        distanceInput?.focus();
        setLoading(false);
        return;
      }
      if (currentExsList.includes(distanceValue + "k " + value)) {
        toast("This exercise is already in the workout", {
          id: "add-exercise",
          icon: '⚠️',
        });
        setLoading(false);
        return;
      }
      if (distanceValue === "0") {
        toast("Please enter a distance greater than 0", {
          id: "add-exercise",
          icon: '⚠️',
        });
        setLoading(false);
        return;
      }
    }
    const toastId = toast.loading("Adding...");
    fetch(`/api/workout/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: value !== "Distance Run" ? value : distanceValue + "k " + value,
      }),
    }).then(async (res) => {
      if (res.status === 200) {
        setValue(null)
        const { exercise } = await res.json();
        toast.success("Great exercise!", {
          id: toastId
        })
        router.refresh();
        setOpen(false);
      } else {
        const { error } = await res.json();
        toast.error(error, {
          id: toastId
        });
      }
      setLoading(false);
    });
  }
  return (
    <>
      <button className="flex items-center p-3 rounded-full sm:py-2 sm:rounded-lg border border-black bg-sky-600 hover:bg-sky-900 sm:border-zinc-800 sm:bg-black sm:hover:bg-zinc-800 transition-all"
        onClick={() => setOpen(true)}
      >
        <div className="flex sm:hidden flex-row justify-center items-center">
          <GoPlus size={28} strokeWidth={1.1} />
        </div>
        <div className="hidden sm:flex flex-row justify-center items-center mx-2">
          <GoPlus size={20} strokeWidth={0.3} /><span className="px-1.5 pb-0.5">Exercise</span>
        </div>
      </button>
      <Modal disableRestoreFocus open={open} className="flex justify-center items-center backdrop-blur-0 bg-black/50"
        onClose={() => {
          if (!loading) setOpen(false)
          if (!loading) setValue(null)
        }} >
        <div className="fixed grid w-5/6 sm:w-full sm:max-w-md p-6 rounded-lg bg-black border border-zinc-800">
          <span className="text-lg font-medium text-center sm:text-left">Add an Exercise</span>
          <span className="text-sm text-zinc-400 pt-1 leading-tight text-center sm:text-left">This will add the selected exercise to the workout.</span>
          <div className="flex flex-col space-y-4 pt-6">
            <CssVarsProvider defaultMode="dark" />
            <div>
              <label htmlFor="exercise" className="block text-xs text-zinc-400">
                Exercise Name
              </label>
              <Autocomplete
                id="exercise"
                autoFocus
                required
                placeholder="Add..."
                value={value}
                onChange={(e, newValue) => {
                  setValue(newValue);
                  setIsOpen(false);
                  setDistanceValue("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    submit()
                  }
                }}
                inputValue={inputValue}
                onInputChange={(e, newInputValue) => {
                  const input = document.getElementById("exercise");
                  (input as HTMLInputElement).setCustomValidity("");
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
                className="mt-1 w-full relative z-0 border border-zinc-800 bg-black focus-within:border-zinc-400 focus-within:outline-none focus-within:ring-black"
              />
              {value === "Distance Run" &&
                <form onSubmit={submit} className="flex flex-col space-y-4 -mb-4">
                  <div>
                    <label htmlFor="distance" className="block text-xs text-zinc-400 mt-3">
                      Run Distance (km)
                    </label>
                    <Input id="distance" required placeholder="3.5" value={distanceValue}
                      title="From 0.01 to 99.99 (2 decimals)"
                      onChange={(e) => {
                        setDistanceValue(e.target.value);
                      }}
                      slotProps={{
                        input: {
                          autoComplete: "off",
                          inputMode: "decimal",
                          pattern: "[1-9]0\.\d+|[1-9]\d{0,1}?|[1-9]{1,2}(\.[0-9]{1,2})|0(\.[0-9]{1,2})$",
                          minLength: 1,
                          maxLength: 5,
                          title: "From 0.01 to 99.99 (2 decimals)"
                        },
                      }}
                      sx={{
                        "--Input-focusedThickness": '0rem',
                        "--Input-placeholderOpacity": 0.25
                      }}
                      className="mt-1 w-full relative z-0 border border-zinc-800 bg-black focus-within:border-zinc-400 focus-within:outline-none focus-within:ring-black"
                    />
                  </div>
                  <div className="sm:self-end sm:justify-end sm:w-20">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`${loading
                        ? "bg-black border border-black cursor-not-allowed"
                        : "bg-sky-600 hover:bg-sky-700 border border-black"
                        } h-10 w-full flex items-center justify-center rounded-md text-md font-semibold transition-all`}
                    >
                      {loading ? (
                        <LoadingDots color="#808080" />
                      ) : (
                        <p>Add</p>
                      )}
                    </button>
                  </div>
                </form>
              }
            </div>
            <div className="sm:self-end sm:justify-end sm:w-20">
              <button
                onClick={submit}
                disabled={loading}
                className={`${(value === "Distance Run") ? "hidden" : ""} ${loading
                  ? "bg-black border border-black cursor-not-allowed"
                  : "bg-sky-600 hover:bg-sky-700 border border-black"
                  } h-10 w-full flex items-center justify-center rounded-md text-md font-semibold transition-all`}
              >
                {loading ? (
                  <LoadingDots color="#808080" />
                ) : (
                  <p>Add</p>
                )}
              </button>
            </div>
          </div>
          <button className="absolute right-3 top-3 p-1 rounded-md hover:bg-zinc-800"
            onClick={() => {
              if (!loading) setOpen(false)
              if (!loading) setValue(null)
            }}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
              <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </button>
        </div>
      </Modal>
    </>
  );
}

