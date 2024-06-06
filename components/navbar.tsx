import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserDropdown from "./user-dropdown";

export default async function NavBar() {
  const session = await getServerSession(authOptions);
  return (
    <nav className="flex justify-center p-3 pl-2.5">
      <div className="flex justify-between w-full max-w-5xl">
        <Link href="/" className="flex flex-row gap-2 py-0.5">
          <Image
            src="/logo-transparent.png"
            alt="MyFitHub Logo"
            width={60}
            height={34}
            className="w-[60px] h-[34px]"
          />
          {!session && <h1 className=" font-semibold leading-8">MyFitHub</h1>}
        </Link>
        {session && session.user ? (
          <UserDropdown user={session.user} />
        ) : (
          <div className="flex space-x-3">
            <Link href="/login" className=" hover:text-zinc-400 flex items-center justify-center text-md font-semibold transition-all">
              <button>
                Sign In
              </button>
            </Link>
            <Link href="/register">
              <button className="bg-sky-800 hover:bg-sky-900 hover:text-zinc-400 border border-black h-full w-20 flex items-center justify-center rounded-md text-md font-semibold transition-all focus:outline-none">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
};