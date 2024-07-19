import { useFormStatus } from "react-dom";

export default function FormDeleteButton(): JSX.Element {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} aria-disabled={pending}>
      {pending ? "Menghapus..." : "Hapus"}
    </button>
  );
}
