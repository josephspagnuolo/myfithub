"use client";

export default function ClosingButton({
  id
}: {
  id: string;
}) {
  function clearRadio() {
    let radio = document.getElementById(id) as HTMLInputElement;
    radio.checked = !radio.checked;
  }
  return (
    <button className="text-stone-200 hover:text-stone-400 text-[46px] font-extralight leading-3 pb-2.5" onClick={() => clearRadio()}><span>+</span></button>
  );
}
