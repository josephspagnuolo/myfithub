import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { randomUUID } from "crypto";
import { ForgotPasswordEmailTemplate } from "@/components/forgot-password-email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { email } = await req.json();
  const existingUser = await prisma.user.findFirst({
    where: {
      email,
      active: true,
      providerId: null,
    },
  });
  if (!existingUser) {
    return NextResponse.json({ data: email });
  } else {
    const token = await prisma.passwordResetToken.create({
      data: {
        userId: existingUser.id,
        token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
      },
    });
    try {
      const userEmail = email as string;
      const emailData = await resend.emails.send({
        from: 'MyFitHub <security@mail.myfithub.link>',
        to: userEmail,
        subject: "MyFitHub Password Reset Request",
        react: ForgotPasswordEmailTemplate({ name: existingUser.name as string, token: token.token }) as React.ReactElement,
      });
      return NextResponse.json({ data: emailData, existingUser });
    } catch (error) {
      return NextResponse.json({ error });
    }
  }
}
