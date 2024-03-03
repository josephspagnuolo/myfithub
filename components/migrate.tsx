"use client";

import { useState } from "react";
import LoadingDots from "@/components/loading-dots";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Migrate() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          fetch("/api/migrate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }).then(async (res) => {
            if (res.status === 200) {
              toast.success("Migrated");
              setTimeout(() => {
                router.refresh();
                router.replace(`/`);
              }, 2000);
            } else {
              const { error } = await res.json();
              toast.error(error);
            }
          });
        }}
        className="flex flex-col space-y-4 px-4 py-8 sm:px-16"
      >
        <button
          type="submit"
          disabled={loading}
          className={`${loading
            ? "cursor-not-allowed border-[#292929] bg-[#292929]"
            : "border-black bg-sky-800 text-gray-300 hover:bg-sky-900"} flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
        >
          {loading ? (
            <LoadingDots color="#808080" />
          ) : (
            <p>Migrate</p>
          )}
        </button>
      </form>
    </>
  );
}

