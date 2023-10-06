import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { EmailTemplate } from "@/components/email-template";
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
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
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
    })
    try {
      const userEmail = email as string;
      const emailData = await resend.emails.send({
        from: 'MyFitHub <onboarding@resend.dev>',
        to: "josephspagnuolo1@gmail.com",
        //to: userEmail,
        subject: "MyFitHub Registration",
        react: EmailTemplate({ name: user.name as string, token: token.token }) as React.ReactElement,
      });

      return NextResponse.json({ data: emailData, user });
    } catch (error) {
      return NextResponse.json({ error });
    }
    //return NextResponse.json(user);
  }
}
