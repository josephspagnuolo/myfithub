import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const allUsers = await prisma.user.findMany();
  allUsers.forEach(async u => {
    await prisma.workout.updateMany({
      where: {
        userEmail: u.email + "",
      },
      data: {
        userId: u.id,
      },
    });
  });
  return NextResponse.json({ message: "success" });
}
