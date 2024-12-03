"use client";

import { useState } from "react";
import LoadingDots from "@/components/loading-dots";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AddSet({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [repsInputValue, setRepsInputValue] = useState("");
  const [weightInputValue, setWeightInputValue] = useState("");
  const [hrsInputValue, setHrsInputValue] = useState("");
  const [minsInputValue, setMinsInputValue] = useState("");
  const [secondsInputValue, setSecondsInputValue] = useState("");
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          if (
            repsInputValue === "" &&
            weightInputValue === "" &&
            hrsInputValue === "" &&
            minsInputValue === "" &&
            secondsInputValue === ""
          ) {
            toast("Please enter any of the set info", {
              id: "add-set",
              icon: "⚠️",
            });
            setLoading(false);
          } else {
            const toastId = toast.loading("Adding...");
            fetch(`/api/exercise/${id}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                reps: repsInputValue,
                weight: weightInputValue,
                timehrs: hrsInputValue,
                timemins: minsInputValue,
                timeseconds: secondsInputValue,
              }),
            }).then(async (res) => {
              if (res.status === 200) {
                const { set } = await res.json();
                setRepsInputValue("");
                setWeightInputValue("");
                setHrsInputValue("");
                setMinsInputValue("");
                setSecondsInputValue("");
                router.refresh();
                toast.success("Great set!", {
                  id: toastId,
                });
              } else {
                const { error } = await res.json();
                toast.error(error, {
                  id: toastId,
                });
              }
              setLoading(false);
            });
          }
        }}
        className="grid grid-cols-3 grid-rows-2 items-end gap-y-2 p-1 sm:grid-cols-6 sm:grid-rows-1"
      >
        <div>
          <input
            id="reps"
            onChange={(e) => setRepsInputValue(e.target.value)}
            value={repsInputValue}
            type="text"
            disabled={loading}
            inputMode="numeric"
            pattern="[1-9]\d*"
            maxLength={3}
            placeholder="12"
            title="From 1 to 999"
            className="w-[56px] appearance-none rounded-md border border-zinc-800 px-3 py-2 placeholder-zinc-400 placeholder-opacity-25 shadow-none focus:outline-none focus:ring-2 focus:ring-sky-600 sm:text-sm"
          />
          <label className="mx-2 mt-1 text-sm" htmlFor="reps">
            reps
          </label>
        </div>
        <div>
          <input
            id="weight"
            onChange={(e) => setWeightInputValue(e.target.value)}
            value={weightInputValue}
            type="text"
            disabled={loading}
            inputMode="numeric"
            pattern="[1-9]\d*|0"
            maxLength={4}
            placeholder="225"
            title="From 0 to 9999"
            className="w-[61px] appearance-none rounded-md border border-zinc-800 px-3 py-2 placeholder-zinc-400 placeholder-opacity-25 shadow-none focus:outline-none focus:ring-2 focus:ring-sky-600 sm:text-sm"
          />
          <label className="mx-2 mt-1.5 text-sm" htmlFor="weight">
            lbs&nbsp;
          </label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`${
            loading
              ? "cursor-not-allowed border border-zinc-900 bg-zinc-900"
              : "border border-black bg-sky-600 hover:bg-sky-700"
          } text-md flex h-10 w-full items-center justify-center rounded-md font-semibold transition-all sm:hidden`}
        >
          {loading ? <LoadingDots color="#808080" /> : <p>Add Set</p>}
        </button>
        <div className="col-span-3 flex justify-center space-x-5">
          <div>
            <input
              id="hrs"
              onChange={(e) => setHrsInputValue(e.target.value)}
              value={hrsInputValue}
              type="text"
              disabled={loading}
              inputMode="numeric"
              pattern="[1-9]\d*|0"
              maxLength={2}
              placeholder="2"
              title="From 0 to 99"
              className="w-[48px] appearance-none rounded-md border border-zinc-800 px-3 py-2 placeholder-zinc-400 placeholder-opacity-25 shadow-none focus:outline-none focus:ring-2 focus:ring-sky-600 sm:text-sm"
            />
            <label className="mx-2 mt-1.5 text-sm" htmlFor="hrs">
              hrs
            </label>
          </div>
          <div>
            <input
              id="mins"
              onChange={(e) => setMinsInputValue(e.target.value)}
              value={minsInputValue}
              type="text"
              disabled={loading}
              inputMode="numeric"
              pattern="^([1-5]?[0-9]|59)$"
              maxLength={2}
              placeholder="45"
              title="From 0 to 59"
              className="w-[48px] appearance-none rounded-md border border-zinc-800 px-3 py-2 placeholder-zinc-400 placeholder-opacity-25 shadow-none focus:outline-none focus:ring-2 focus:ring-sky-600 sm:text-sm"
            />
            <label className="mx-2 mt-1.5 text-sm" htmlFor="mins">
              min
            </label>
          </div>
          <div>
            <input
              id="seconds"
              onChange={(e) => setSecondsInputValue(e.target.value)}
              value={secondsInputValue}
              type="text"
              disabled={loading}
              inputMode="numeric"
              pattern="^([1-5]?[0-9]|59)$"
              maxLength={2}
              placeholder="30"
              title="From 0 to 59"
              className="-ml-1 w-[48px] appearance-none rounded-md border border-zinc-800 px-3 py-2 placeholder-zinc-400 placeholder-opacity-25 shadow-none focus:outline-none focus:ring-2 focus:ring-sky-600 sm:text-sm"
            />
            <label className="mx-2 mt-1.5 text-sm" htmlFor="seconds">
              sec
            </label>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`${
            loading
              ? "cursor-not-allowed border border-zinc-900 bg-zinc-900"
              : "border border-black bg-sky-600 hover:bg-sky-700"
          } text-md hidden h-10 w-full items-center justify-center rounded-md font-semibold transition-all sm:flex`}
        >
          {loading ? <LoadingDots color="#808080" /> : <p>Add Set</p>}
        </button>
      </form>
    </>
  );
}
