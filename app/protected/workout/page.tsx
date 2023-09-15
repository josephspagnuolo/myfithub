import CreateWorkout from "@/components/create-workout";

export default function Workout() {
  return (
    <div className="flex h-screen">
      <div className="w-screen h-screen flex flex-col space-y-5 justify-center items-center">
        <CreateWorkout />
      </div>
    </div>
  );
}
