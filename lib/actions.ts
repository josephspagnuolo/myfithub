"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import supabase from "@/lib/supabase";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export async function editProfile(
  id: string,
  currentImage: string,
  formData: FormData,
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id || session.user.id !== id) {
    console.log("An error occurred while editing your profile.");
    return "error";
  }

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
  if (error) {
    console.log("An error occurred while uploading your image:", error.message);
    return "error";
  }
  const editedProfile = prisma.user.update({
    where: {
      id,
    },
    data: {
      image:
        process.env.SUPABASE_URL! + process.env.IMAGE_PREFIX + data?.fullPath,
    },
  });
  try {
    await prisma.$transaction([editedProfile]);
  } catch (error) {
    console.log("An error occurred while editing your profile:", error);
    return "error";
  }
  revalidatePath("/", "layout");
}

export async function removeProfileImage(id: string, currentImage: string) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id || session.user.id !== id) {
    console.log("An error occurred while removing your profile image.");
    return "error";
  }

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
    return "error";
  }
  revalidatePath("/", "layout");
}

export async function editAccount(id: string, name: string) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id || session.user.id !== id) {
    console.log("An error occurred while editing your account.");
    return "error";
  }

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
    return "error";
  }
  revalidatePath("/", "layout");
}

export async function deleteAccount(id: string) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id || session.user.id !== id) {
    console.log("An error occurred while deleting your account.");
    return "error";
  }

  const deletedAccount = prisma.user.delete({ where: { id } });
  try {
    await prisma.$transaction([deletedAccount]);
  } catch (error) {
    console.log("An error occurred while deleting your account:", error);
    return "error";
  }
}

export async function createWorkout(content: string) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    console.log("An error occurred while adding the workout.");
    return "error";
  }

  const createdWorkout = prisma.workout.create({
    data: {
      content,
      userId: session.user.id,
    },
  });
  try {
    const workout = await prisma.$transaction([createdWorkout]);
    return workout[0].id;
  } catch (error) {
    console.log("An error occurred while deleting the workout:", error);
    return "error";
  }
}

export async function deleteWorkout(id: string) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    console.log("An error occurred while deleting the workout.");
    return "error";
  }

  const deletedWorkout = prisma.workout.delete({
    where: { id, user: session.user },
  });
  try {
    await prisma.$transaction([deletedWorkout]);
  } catch (error) {
    console.log("An error occurred while deleting the workout:", error);
    return "error";
  }
  revalidatePath("/dashboard", "layout");
}

export async function editWorkoutTitle(id: string, content: string) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    console.log("An error occurred while editing the workout title.");
    return "error";
  }

  const editedWorkoutTitle = prisma.workout.update({
    where: {
      id,
      user: session.user,
    },
    data: {
      content,
    },
  });
  try {
    await prisma.$transaction([editedWorkoutTitle]);
  } catch (error) {
    console.log("An error occurred while editing the workout title:", error);
    return "error";
  }
  revalidatePath("/dashboard", "layout");
}

export async function addExercise(
  id: string,
  name: string,
  notes: string | null,
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    console.log("An error occurred while adding the exercise.");
    return "error";
  }

  const workout = await prisma.workout.findUnique({
    where: {
      id,
      user: session.user,
    },
    include: {
      exercises: true,
    },
  });
  if (workout) {
    const lastTime = workout.exercises
      .at(workout.exercises.length)
      ?.createdAt?.getTime();
    const addedExercise = prisma.exercise.create({
      data: {
        name,
        notes,
        workoutId: id,
        createdAt: new Date(
          lastTime ? lastTime + 1 : workout.createdAt.getTime(),
        ),
      },
    });
    try {
      await prisma.$transaction([addedExercise]);
    } catch (error) {
      console.log("An error occurred while adding the exercise:", error);
      return "error";
    }
    revalidatePath("/dashboard/workout", "layout");
  } else {
    console.log("An error occurred while adding the exercise.");
    return "error";
  }
}

export async function editExerciseNotes(id: string, notes: string) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    console.log("An error occurred while editing the exercise notes.");
    return "error";
  }

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
    return "error";
  }
  revalidatePath("/dashboard/workout", "layout");
}

export async function deleteExercise(id: string) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    console.log("An error occurred while deleting the exercise.");
    return "error";
  }

  const deletedExercise = prisma.exercise.delete({ where: { id } });
  try {
    await prisma.$transaction([deletedExercise]);
  } catch (error) {
    console.log("An error occurred while deleting the exercise:", error);
    return "error";
  }
  revalidatePath("/dashboard/workout", "layout");
}

export async function addExerciseSet(
  id: string,
  reps: string | null,
  weight: string | null,
  timehrs: string | null,
  timemins: string | null,
  timeseconds: string | null,
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    console.log("An error occurred while adding the set.");
    return "error";
  }

  const exercise = await prisma.exercise.findUnique({
    where: {
      id,
    },
  });
  if (exercise) {
    const addedExerciseSet = prisma.exerciseSet.create({
      data: {
        reps,
        weight,
        timehrs,
        timemins,
        timeseconds,
        exerciseId: id,
      },
    });
    try {
      await prisma.$transaction([addedExerciseSet]);
    } catch (error) {
      console.log("An error occurred while adding the set:", error);
      return "error";
    }
    revalidatePath("/dashboard/workout", "layout");
  } else {
    console.log("An error occurred while adding the set.");
    return "error";
  }
}
