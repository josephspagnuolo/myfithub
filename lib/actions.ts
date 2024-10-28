"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function editAccount(id: string, name: string) {
  const editedAccount = prisma.user.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });
  try {
    await prisma.$transaction([editedAccount]);
  } catch (error) {
    console.log("An error occurred while editing your account:", error);
  }
  revalidatePath("/", "layout");
}

export async function deleteAccount(id: string) {
  const deletedAccount = prisma.user.delete({ where: { id } });
  try {
    await prisma.$transaction([deletedAccount]);
  } catch (error) {
    console.log("An error occurred while deleting your account:", error);
  }
}

export async function deleteWorkout(id: string) {
  const deletedWorkout = prisma.workout.delete({ where: { id } });
  try {
    await prisma.$transaction([deletedWorkout]);
  } catch (error) {
    console.log("An error occurred while deleting the workout:", error);
  }
  revalidatePath("/dashboard", "layout");
}

export async function editWorkoutTitle(id: string, content: string) {
  const editedWorkoutTitle = prisma.workout.update({
    where: {
      id,
    },
    data: {
      content,
    },
  });
  try {
    await prisma.$transaction([editedWorkoutTitle]);
  } catch (error) {
    console.log("An error occurred while editing the workout title:", error);
  }
  revalidatePath("/dashboard", "layout");
}

export async function editExerciseNotes(id: string, notes: string) {
  const editedExerciseNotes = prisma.exercise.update({
    where: {
      id,
    },
    data: {
      notes,
    },
  });
  try {
    await prisma.$transaction([editedExerciseNotes]);
  } catch (error) {
    console.log("An error occurred while editing the exercise notes:", error);
  }
  revalidatePath("/dashboard", "layout");
}

export async function deleteExercise(id: string) {
  const deletedExercise = prisma.exercise.delete({ where: { id } });
  try {
    await prisma.$transaction([deletedExercise]);
  } catch (error) {
    console.log("An error occurred while deleting the exercise:", error);
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
    },
  });
  return exercise ? exercise.sets : [];
}
