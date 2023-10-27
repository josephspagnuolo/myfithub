import AddExercise from "@/components/add-exercise";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import Link from "next/link";

export default async function WorkoutPage({ params }: { params: { id: string } }) {
  const { id } = params
  const session = await getServerSession();
  const useremail = session!.user!.email + "";
  const thisWorkout = await prisma.workout.findFirst({
    where: {
      userEmail: useremail,
      id: id,
    },
    select: {
      content: true,
      createdAt: true,
    }
  })
  return (
    <div className="flex h-[85vh] sm:h-screen">
      <div className="w-screen flex flex-col space-y-5 justify-center items-center px-4">
        <Link className="flex overflow-y-clip" href="/dashboard"><div className="scale-y-[2] scale-x-150 -translate-y-[2.5px] mr-0.5">←</div>&nbsp;Back to dashboard</Link>
        {thisWorkout ? (
          <>
            <div>My Workout: {id}</div>
            <div>My Workout: {thisWorkout.content}</div>
            <div>My Workout TIme: {thisWorkout.createdAt.toLocaleString('en-US', { timeZone: 'America/New_York' })}</div>
            {/* <AddExercise /> */}
          </>
        ) : (
          <>
            <span className="text-stone-400 text-sm">
              No workout to show here...
            </span>
          </>
        )}
      </div>
    </div>
  );
}