"use client"

export default function ClosingButton({ id }: { id: string }) {
  function clearRadio() {
    let radio = document.getElementById(id) as HTMLInputElement;
    if (radio.checked == false) {
      radio.checked = true;
    } else {
      radio.checked = false;
    }
  }
  return (
    <button onClick={() => clearRadio()}></button>
  );
}
