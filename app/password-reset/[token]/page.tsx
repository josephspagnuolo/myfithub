import PasswordResetForm from "@/components/password-reset-form";
import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import Card from "@/components/card";

export default async function PasswordResetPage({
  params,
}: {
  params: { token: string };
}) {
  const { token } = params;

  const thisToken = await prisma.passwordResetToken.findUnique({
    where: {
      token,
      createdAt: { gt: new Date(Date.now() - 1000 * 60 * 60) },
      resetAt: null,
    },
  });

  return (
    <main className="flex grow justify-center">
      <div className="flex w-full max-w-5xl grow flex-col items-center justify-center space-y-5 p-4">
        {thisToken ? (
          <div className="flex w-full max-w-md">
            <Card>
              <div className="-mx-6 flex flex-col items-center justify-center space-y-2 border-b border-zinc-800 pb-3 text-center">
                <Image
                  src="/logo-transparent.png"
                  priority
                  alt="MyFitHub Logo"
                  width={60}
                  height={34}
                  className="h-[34px] w-[60px]"
                />
                <h3 className="text-xl font-semibold">Password Reset</h3>
                <p className="text-sm text-zinc-400">
                  Enter your new password for your MyFitHub account
                </p>
              </div>
              <PasswordResetForm token={token} />
            </Card>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Link href="/">
              <Image
                src="/logo-transparent.png"
                priority
                alt="MyFitHub Logo"
                width={60}
                height={34}
                className="h-[34px] w-[60px]"
              />
            </Link>
            <span className="text-sm text-zinc-400">
              Error! You should not be here...
            </span>
          </div>
        )}
      </div>
    </main>
  );
}
