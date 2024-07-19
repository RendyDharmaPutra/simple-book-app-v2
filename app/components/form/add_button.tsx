"use client";

import { useFormStatus } from "react-dom";

export default function AddButton(): JSX.Element {
  const { pending } = useFormStatus();

  return (
    <>
      <button
        type="submit"
        disabled={pending}
        aria-disabled={pending}
        className={`self-end w-full ${
          pending
            ? "md:w-[8rem] bg-gray-200 text-gray-800 btn"
            : "md:w-[6rem] btn-primary"
        } h-[2.5rem] `}
      >
        {pending ? "Menyimpan..." : "Simpan"}
      </button>
    </>
  );
}
