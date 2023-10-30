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
      exercises: true,
    }
  })
  return (
    <div className="flex">
      <div className="w-screen flex flex-col space-y-5 justify-center items-center px-4 py-14">
        <Link className="absolute top-8 flex overflow-y-clip" href="/dashboard"><div className="sm:scale-y-[2] sm:scale-x-150 sm:-translate-y-[2.5px] sm:mr-0.5">←</div>&nbsp;Back to dashboard</Link>
        {thisWorkout ? (
          <>
            <div className="flex flex-col w-full items-center">
              <div className="text-xl font-medium text-left w-full max-w-md sm:px-4 -translate-y-1">{thisWorkout.content}</div>
              <div className="text-left text-stone-400 w-full max-w-md sm:px-4 leading-3">
                {thisWorkout.createdAt.toLocaleString('en-US', { timeZone: 'America/New_York', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
              </div>
            </div>
            <AddExercise id={id} />
            {thisWorkout.exercises.length === 0 ? (
              <span className="text-stone-400 text-sm">
                No exercises so far...
              </span>
            ) : (
              <>
                {thisWorkout.exercises.map((ex) => (
                  <div key={ex.id} className="w-full max-w-md sm:max-w-5xl rounded-2xl">
                    <div className="z-10 w-full max-w-md sm:max-w-5xl overflow-hidden rounded-2xl shadow-xl bg-[#292929] hover:bg-opacity-60 flex flex-col space-y-3 px-4 py-4 sm:px-[67px]">
                      {ex.name}
                    </div>
                  </div>
                ))}
              </>
            )}
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