"use client";

import { useState } from "react";
import { GoDash, GoPlus } from "react-icons/go";

export default function ClosingButton({
  id,
  defaultChecked,
}: {
  id: string;
  defaultChecked: boolean;
}) {
  const [checked, setChecked] = useState(defaultChecked);

  function handleClick() {
    const radio = document.getElementById(id) as HTMLInputElement;
    if (radio) {
      radio.checked = !radio.checked;
      setChecked(radio.checked);
    }
  }

  return (
    <button
      className="relative mt-1 flex h-10 w-10 items-center justify-center rounded-md transition-all hover:bg-zinc-800"
      onClick={handleClick}
    >
      {checked ? (
        <GoDash size={29} strokeWidth={1.2} className="pb-[3px]" />
      ) : (
        <GoPlus size={28} strokeWidth={1} />
      )}
    </button>
  );
}
