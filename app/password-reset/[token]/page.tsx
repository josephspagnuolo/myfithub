import PasswordResetForm from "@/components/password-reset-form";
import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

export default async function PasswordResetPage({
  params
}: {
  params: { token: string };
}) {
  const { token } = params;

  const thisToken = await prisma.passwordResetToken.findUnique({
    where: {
      token,
      createdAt: { gt: new Date(Date.now() - 1000 * 60 * 60) },
      resetAt: null,
    }
  });

  return (
    <main className="flex grow items-center justify-center flex-col">
      {thisToken ? (
        <>
          <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-600 shadow-xl bg-[#292929]">
            <div className="flex flex-col items-center justify-center space-y-2 border-b border-gray-600 px-4 py-4 pt-5 text-center sm:px-16">
              <Image
                src="/logo.png"
                priority
                alt="Logo"
                className="h-10 w-10 rounded-full"
                width={20}
                height={20}
              />
              <h3 className="text-xl font-semibold">Password Reset</h3>
              <p className="text-sm text-gray-400">
                Enter your new password for your MyFitHub account
              </p>
            </div>
            <PasswordResetForm token={token} />
          </div>
        </>
      ) : (
        <>
          <Link href="/">
            <Image
              src="/logo.png"
              priority
              alt="Logo"
              className="h-16 w-16 rounded-full"
              width={20}
              height={20}
            />
          </Link>
          <span className="text-stone-400 text-sm">
            Error! You should not be here...
          </span>
        </>
      )}
    </main>
  );
}