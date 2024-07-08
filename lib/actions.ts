"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteExercise(id: string) {
  const deletedExercise = prisma.exercise.delete({ where: { id } });
  try {
    await prisma.$transaction([deletedExercise]);
  } catch (error) {
    console.log("An error occurred while deleting the exercise:", error)
  }
  revalidatePath("/dashboard/workout", "layout");
}

export async function showSets(id: string) {
  const exercise = await prisma.exercise.findFirst({
    where: {
      id: id,
    },
    select: {
      sets: true,
      createdAt: true,
    }
  });
  return exercise ? exercise.sets : [];
}