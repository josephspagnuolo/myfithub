"use client";

import { useState } from "react";
import LoadingDots from "@/components/loading-dots";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AddSet({
  id
}: {
  id: string;
}) {
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
          if ((repsInputValue === "") && (weightInputValue === "") && (hrsInputValue === "") && (minsInputValue === "") && (secondsInputValue === "")) {
            console.log("empty")
            toast("Please enter any of the set info", {
              id: "add-set",
              icon: '⚠️',
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
                const { set } = await res.json()
                setRepsInputValue("");
                setWeightInputValue("");
                setHrsInputValue("");
                setMinsInputValue("");
                setSecondsInputValue("");
                router.refresh();
                toast.success("Great set!", {
                  id: toastId
                });
              } else {
                const { error } = await res.json();
                toast.error(error, {
                  id: toastId
                });
              }
              setLoading(false);
            });
          }
        }}
        className="grid grid-cols-3 grid-rows-2 sm:grid-cols-6 sm:grid-rows-1 pt-5 gap-y-2"
      >
        <div>
          <input
            id="reps"
            onChange={(e) => setRepsInputValue(e.target.value)}
            value={repsInputValue}
            type="text"
            inputMode="numeric"
            pattern="[1-9]\d*"
            maxLength={3}
            placeholder="12"
            title="From 1 to 999"
            className="w-[56px] appearance-none rounded-md border border-zinc-800 bg-black px-3 py-2 placeholder-zinc-400 shadow-sm focus:border-zinc-400 focus:outline-none focus:ring-black sm:text-sm placeholder-opacity-25"
          />
          <label className="mt-1 mx-2 text-sm" htmlFor="reps">reps</label>
        </div>
        <div>
          <input
            id="weight"
            onChange={(e) => setWeightInputValue(e.target.value)}
            value={weightInputValue}
            type="text"
            inputMode="numeric"
            pattern="[1-9]\d*|0"
            maxLength={4}
            placeholder="225"
            title="From 0 to 9999"
            className="w-[61px] appearance-none rounded-md border border-zinc-800 bg-black px-3 py-2 placeholder-zinc-400 shadow-sm focus:border-zinc-400 focus:outline-none focus:ring-black sm:text-sm placeholder-opacity-25"
          />
          <label className="mt-1.5 mx-2 text-sm" htmlFor="weight">lbs&nbsp;</label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`${loading
            ? "bg-stone-900 border border-stone-900 cursor-not-allowed"
            : "bg-sky-600 hover:bg-sky-700 border border-black"
            } h-10 w-full flex items-center justify-center rounded-md text-md font-semibold transition-all sm:hidden`}
        >
          {loading ? (
            <LoadingDots color="#808080" />
          ) : (
            <p>Add Set</p>
          )}
        </button>
        <div className="col-span-3 flex space-x-8 sm:space-x-5 justify-normal sm:justify-center">
          <div>
            <input
              id="hrs"
              onChange={(e) => setHrsInputValue(e.target.value)}
              value={hrsInputValue}
              type="text"
              inputMode="numeric"
              pattern="[1-9]\d*|0"
              maxLength={2}
              placeholder="2"
              title="From 0 to 99"
              className="w-[48px] appearance-none rounded-md border border-zinc-800 bg-black px-3 py-2 placeholder-zinc-400 shadow-sm focus:border-zinc-400 focus:outline-none focus:ring-black sm:text-sm placeholder-opacity-25"
            />
            <label className="mt-1.5 mx-2 text-sm" htmlFor="hrs">hrs</label>
          </div>
          <div>
            <input
              id="mins"
              onChange={(e) => setMinsInputValue(e.target.value)}
              value={minsInputValue}
              type="text"
              inputMode="numeric"
              pattern="^([1-5]?[0-9]|59)$"
              maxLength={2}
              placeholder="45"
              title="From 0 to 59"
              className="w-[48px] appearance-none rounded-md border border-zinc-800 bg-black px-3 py-2 placeholder-zinc-400 shadow-sm focus:border-zinc-400 focus:outline-none focus:ring-black sm:text-sm placeholder-opacity-25"
            />
            <label className="mt-1.5 mx-2 text-sm" htmlFor="mins">min</label>
          </div>
          <div>
            <input
              id="seconds"
              onChange={(e) => setSecondsInputValue(e.target.value)}
              value={secondsInputValue}
              type="text"
              inputMode="numeric"
              pattern="^([1-5]?[0-9]|59)$"
              maxLength={2}
              placeholder="30"
              title="From 0 to 59"
              className="-ml-1 w-[48px] appearance-none rounded-md border border-zinc-800 bg-black px-3 py-2 placeholder-zinc-400 shadow-sm focus:border-zinc-400 focus:outline-none focus:ring-black sm:text-sm placeholder-opacity-25"
            />
            <label className="mt-1.5 mx-2 text-sm" htmlFor="seconds">sec</label>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`${loading
            ? "bg-stone-900 border border-stone-900 cursor-not-allowed"
            : "bg-sky-600 hover:bg-sky-700 border border-black"} h-10 w-full sm:flex items-center justify-center rounded-md text-md font-semibold transition-all hidden`}
        >
          {loading ? (
            <LoadingDots color="#808080" />
          ) : (
            <p>Add Set</p>
          )}
        </button>
      </form>
    </>
  );
}

