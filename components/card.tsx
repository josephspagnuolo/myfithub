export default function Card({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <div
      id={id}
      className="flex w-full flex-col space-y-3 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 pt-5"
    >
      {children}
    </div>
  );
}
