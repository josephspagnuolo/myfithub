import Migrate from "@/components/migrate";

export default async function MigratePage() {
  return (
    <main className="flex grow">
      <div className="w-screen flex flex-col justify-center items-center">
        <Migrate />
      </div>
    </main>
  );
}
