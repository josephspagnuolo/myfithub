import CreateWorkout from "@/components/create-workout";

export default function Workout() {
  return (
    <main className="flex grow">
      <div className="w-screen flex flex-col space-y-5 justify-center items-center px-4">
        <CreateWorkout />
      </div>
    </main>
  );
}
