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
    <div className="flex">
      <div className="w-screen flex flex-col space-y-5 justify-center items-center">
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full max-w-screen-lg aspect-video"
        ></iframe>
        <Link href="/protected/workout">New Workout</Link>
        <ShowWorkouts />
        <SignOut />
      </div>
    </div>
  );
}
