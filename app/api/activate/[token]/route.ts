import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request, {
  params
}: {
  params: { token: string };
}) {
  const token = params.token;

  const user = await prisma.user.findFirst({
    where: {
      activateTokens: {
        some: {
          AND: [
            {
              activatedAt: null,
            },
            {
              token
            },
          ],
        },
      },
    },
  })

  if (!user)
    return new Response("There was an error activating the account. The token is either invalid or expired.");

  const updateUser = prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      active: true,
    },
  });

  const updateToken = prisma.activateToken.update({
    where: {
      token,
    },
    data: {
      activatedAt: new Date(),
    },
  });
  try {
    await prisma.$transaction([updateUser, updateToken]);
    return new Response("Thank you. Your email was successfully verified and your account has been activated. You can now login to MyFitHub.");
  } catch (error) {
    return NextResponse.json({ error });
  }
}
