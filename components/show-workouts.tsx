import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import WorkoutList from "./workoutlist";

export default async function ShowWorkouts() {
  const session = await getServerSession();
  const userEmail = session!.user!.email + "";
  const workouts = await prisma.workout.findMany({
    where: {
      userEmail,
    }
  })
  return (
    <>
      {/* <WorkoutList workouts={workouts} /> */}
      <div><ul>
        {workouts.map((workout) => (
          <li key={workout.id} {...workout}>{workout.content}{' '}{workout.createdAt.toLocaleString('en-US', { timeZone: 'America/New_York' })}</li>
        ))}
      </ul></div>
    </>
  );
}

