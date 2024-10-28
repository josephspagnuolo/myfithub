import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserDropdown from "@/components/user-dropdown";

export default async function NavBar() {
  const session = await getServerSession(authOptions);
  return (
    <nav className="flex justify-center">
      <div className="flex w-full max-w-5xl justify-between p-3 pl-2.5">
        <div>
          <Link href="/" className="flex flex-row gap-2 py-0.5">
            <Image
              src="/logo-transparent.png"
              alt="MyFitHub Logo"
              width={60}
              height={34}
              className="h-[34px] w-[60px]"
            />
            {!session && (
              <div className="font-semibold leading-8">
                My
                <span className="px-px text-lg font-extrabold text-sky-500">
                  Fit
                </span>
                Hub
              </div>
            )}
          </Link>
        </div>
        {session && session.user ? (
          <UserDropdown user={session.user} />
        ) : (
          <div className="flex space-x-2">
            <Link
              href="/login"
              className="text-md my-[0.5px] flex items-center justify-center rounded-md px-3.5 font-semibold transition-all hover:bg-zinc-800"
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="text-md flex h-full items-center justify-center rounded-md border border-black bg-sky-600 px-2.5 font-semibold transition-all hover:bg-sky-700"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
