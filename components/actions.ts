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