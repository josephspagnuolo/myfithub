import CreateWorkout from "@/components/create-workout";

export default function Workout() {
  return (
    <main className="flex grow justify-center">
      <div className="flex w-full max-w-5xl grow flex-col items-center justify-center space-y-5 p-4">
        <CreateWorkout />
      </div>
    </main>
  );
}
