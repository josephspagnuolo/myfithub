"use client";

import { useState } from "react";
import LoadingDots from "@/components/loading-dots";
import toast from "react-hot-toast";
import { addExerciseSet } from "@/lib/actions";

export default function AddSet({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const [repsInputValue, setRepsInputValue] = useState("");
  const [weightInputValue, setWeightInputValue] = useState("");
  const [hrsInputValue, setHrsInputValue] = useState("");
  const [minsInputValue, setMinsInputValue] = useState("");
  const [secondsInputValue, setSecondsInputValue] = useState("");
  return (
    <form
      onSubmit={async (e) => {
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
          toast.remove("add-set");
          toast.loading("Adding...", {
            id: "add-set",
          });
          const res = await addExerciseSet(
            id,
            repsInputValue,
            weightInputValue,
            hrsInputValue,
            minsInputValue,
            secondsInputValue,
          );
          if (res === "error") {
            toast.error("There was an error adding your set.", {
              id: "add-set",
            });
          } else {
            toast.success("Great exercise!", {
              id: "add-set",
            });
            setRepsInputValue("");
            setWeightInputValue("");
            setHrsInputValue("");
            setMinsInputValue("");
            setSecondsInputValue("");
          }
          setLoading(false);
        }
      }}
      className="grid grid-cols-3 grid-rows-2 items-end gap-y-2 py-1 sm:grid-cols-6 sm:grid-rows-1"
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
          className="w-[56px] appearance-none rounded-md border border-zinc-800 bg-black px-3 py-2 placeholder-zinc-400 placeholder-opacity-25 shadow-none focus:outline-none focus:ring-2 focus:ring-sky-600 disabled:opacity-40"
        />
        <label className="ml-1 mr-2 mt-1 text-sm" htmlFor="reps">
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
          className="w-[61px] appearance-none rounded-md border border-zinc-800 bg-black px-3 py-2 placeholder-zinc-400 placeholder-opacity-25 shadow-none focus:outline-none focus:ring-2 focus:ring-sky-600 disabled:opacity-40"
        />
        <label className="ml-1 mr-2 mt-1.5 text-sm" htmlFor="weight">
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
            className="w-[48px] appearance-none rounded-md border border-zinc-800 bg-black px-3 py-2 placeholder-zinc-400 placeholder-opacity-25 shadow-none focus:outline-none focus:ring-2 focus:ring-sky-600 disabled:opacity-40"
          />
          <label className="ml-1 mr-2 mt-1.5 text-sm" htmlFor="hrs">
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
            className="w-[48px] appearance-none rounded-md border border-zinc-800 bg-black px-3 py-2 placeholder-zinc-400 placeholder-opacity-25 shadow-none focus:outline-none focus:ring-2 focus:ring-sky-600 disabled:opacity-40"
          />
          <label className="ml-1 mr-2 mt-1.5 text-sm" htmlFor="mins">
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
            className="-ml-1 w-[48px] appearance-none rounded-md border border-zinc-800 bg-black px-3 py-2 placeholder-zinc-400 placeholder-opacity-25 shadow-none focus:outline-none focus:ring-2 focus:ring-sky-600 disabled:opacity-40"
          />
          <label className="ml-1 mr-2 mt-1.5 text-sm" htmlFor="seconds">
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
  );
}
