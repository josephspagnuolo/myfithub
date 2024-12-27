import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  {
    params,
  }: {
    params: { token: string };
  },
) {
  const { token } = await params;
  const { password } = await req.json();
  const passwordResetToken = await prisma.passwordResetToken.findUnique({
    where: {
      token,
      createdAt: { gt: new Date(Date.now() - 1000 * 60 * 60) },
      resetAt: null,
    },
  });

  if (!passwordResetToken)
    return NextResponse.json(
      { error: "Error resetting password" },
      { status: 400 },
    );

  const encrypted = await hash(password, 12);

  const updateUser = prisma.user.update({
    where: { id: passwordResetToken.userId },
    data: {
      password: encrypted,
    },
  });

  const updateToken = prisma.passwordResetToken.update({
    where: {
      id: passwordResetToken.id,
    },
    data: {
      resetAt: new Date(),
    },
  });

  try {
    await prisma.$transaction([updateUser, updateToken]);
    return NextResponse.json({ data: updateUser });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
