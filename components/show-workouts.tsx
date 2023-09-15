import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { getSession } from "next-auth/react";

export default async function ShowWorkouts() {
  const session = await getServerSession();
  const userEmail = session!.user!.email + "";
  const workouts = await prisma.workout.findMany({
    where: {
      userEmail,
    }
  })
  return (
    <div><ul>
      {workouts.map((workout) => (
        <li key={workout.id} {...workout}>{workout.content}{workout.createdAt.toString()}</li>
      ))}
    </ul></div>
  );
}

