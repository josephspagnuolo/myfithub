"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import supabase from "@/lib/supabase";

export async function editProfile(
  id: string,
  currentImage: string,
  formData: FormData,
) {
  const bucketName = process.env.BUCKET_NAME!;

  if (currentImage.includes(process.env.SUPABASE_URL!)) {
    const fileName = currentImage.split(`${bucketName}/`)[1];
    await supabase.storage.from(bucketName).remove([fileName]);
  }
  const image = formData.get("file") as File;
  const newName = id + "-" + new Date().getTime();
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(newName, image, {
      contentType: "image/*",
    });
  const editedProfile = prisma.user.update({
    where: {
      id,
    },
    data: {
      image:
        process.env.SUPABASE_URL! +
        process.env.IMAGE_PREFIX +
        process.env.BUCKET_NAME +
        "/" +
        newName,
    },
  });
  try {
    await prisma.$transaction([editedProfile]);
  } catch (error) {
    console.log("An error occurred while editing your profile:", error);
  }
  revalidatePath("/", "layout");
}

export async function removeProfileImage(id: string, currentImage: string) {
  const bucketName = process.env.BUCKET_NAME!;

  if (currentImage.includes(process.env.SUPABASE_URL!)) {
    const fileName = currentImage.split(`${bucketName}/`)[1];
    await supabase.storage.from(bucketName).remove([fileName]);
  }

  const removedProfileImage = prisma.user.update({
    where: {
      id,
    },
    data: {
      image: null,
    },
  });
  try {
    await prisma.$transaction([removedProfileImage]);
  } catch (error) {
    console.log("An error occurred while removing your profile image:", error);
  }
  revalidatePath("/", "layout");
}

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
