import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: { token: string }
  }
) {
  const { token } = params

  const user = await prisma.user.findFirst({
    where: {
      activateTokens: {
        some: {
          AND: [
            {
              activatedAt: null,
            },
            // {
            //   createdAt: {
            //     gt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
            //   },
            // },
            {
              token
            },
          ],
        },
      },
    },
  })

  if (!user) {
    return new Response("There was an error activating the account. The token is either invalid or expired.");
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      active: true,
    },
  })

  await prisma.activateToken.update({
    where: {
      token,
    },
    data: {
      activatedAt: new Date(),
    },
  })
  return new Response("Thank you. Your email was successfully verified and your account has been activated. You can now login to MyFitHub.");
}
