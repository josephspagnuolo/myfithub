import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const allUsers = await prisma.user.findMany();

    const updates = allUsers.map(u => {
      return prisma.workout.updateMany({
        where: {
          userEmail: u.email + "",
        },
        data: {
          userId: u.id,
        },
      });
    });

    await prisma.$transaction(updates);

    return NextResponse.json({ message: "success" });
  } catch (error) {
    console.error("Migration Error:", error);
    return NextResponse.json({ message: "error", detail: error }, { status: 500 });
  }
}
