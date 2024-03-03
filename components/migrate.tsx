"use client";

import { useState } from "react";
import LoadingDots from "@/components/loading-dots";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Migrate() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleMigrate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/migrate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Migration successful!");
        router.push('/');
      } else {
        const { message } = await response.json();
        toast.error(message || "An error occurred during migration.");
      }
    } catch (error) {
      // Catch network errors and log them
      console.error("Migration error:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleMigrate}
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
            "Migrate"
          )}
        </button>
      </form>
    </>
  );
}
