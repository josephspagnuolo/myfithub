"use client";

import { useState } from "react";
import { FaRegCaretSquareDown } from "react-icons/fa";

export default function ClosingButton({
  id, defaultChecked
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
    <button className="text-stone-200 hover:text-stone-400" onClick={handleClick}>
      <FaRegCaretSquareDown size={22} className={`${checked ? 'rotate-180' : 'rotate-0'}`} />
    </button>
  );
}
