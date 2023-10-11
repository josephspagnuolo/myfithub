import CreateWorkout from "@/components/create-workout";
import ShowWorkouts from "@/components/show-workouts";
import SignOut from "@/components/sign-out";
import { getServerSession } from "next-auth";
import Link from "next/link";


export default async function Home() {
  // const getWorkouts = async () => {
  //   const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/workout`)
  //   console.log(res)
  //   return res.json();
  // }
  // const workouts = await getWorkouts();
  // console.log(workouts)
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-between w-full max-w-md sm:max-w-5xl space-y-5 items-center pt-14 px-4 pb-4">
        <div className="text-3xl font-medium">Dashboard</div>
        <Link href="/dashboard/workout">
          <button className="border-black bg-sky-800 text-gray-300 hover:bg-sky-900 flex h-12 w-48 items-center justify-center rounded-md border text-md font-semibold transition-all focus:outline-none">
            New Workout
          </button>
        </Link>
      </div>
      <div className="w-full flex flex-col space-y-5 justify-center items-center px-4 pb-4">
        <ShowWorkouts />
        <SignOut />
      </div>
    </div>
  );
}
