import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { VerifyEmailTemplate } from "@/components/verify-email-template";
import { Resend } from "resend";
import { randomUUID } from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  const exists = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (exists) {
    return NextResponse.json({ error: "Account already exists" }, { status: 400 });
  } else {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: await hash(password, 10),
      },
    });
    const token = await prisma.activateToken.create({
      data: {
        userId: user.id,
        token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
      },
    });
    try {
      const userEmail = email as string;
      const emailData = await resend.emails.send({
        from: 'MyFitHub <security@mail.myfithub.link>',
        to: userEmail,
        subject: "MyFitHub Registration",
        react: VerifyEmailTemplate({ name: user.name as string, token: token.token }) as React.ReactElement,
      });
      return NextResponse.json({ data: emailData, user });
    } catch (error) {
      return NextResponse.json({ error });
    }
  }
}
