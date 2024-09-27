import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserDropdown from "@/components/user-dropdown";

export default async function NavBar() {
  const session = await getServerSession(authOptions);
  return (
    <nav className="flex justify-center p-3 pl-2.5">
      <div className="flex justify-between w-full max-w-[950px]">
        <div>
          <Link href="/" className="flex flex-row gap-2 py-0.5">
            <Image
              src="/logo-transparent.png"
              alt="MyFitHub Logo"
              width={60}
              height={34}
              className="w-[60px] h-[34px]"
            />
            {!session && <div className="font-semibold leading-8">My<span className="text-sky-500 font-extrabold text-lg px-px">Fit</span>Hub</div>}
          </Link>
        </div>
        {session && session.user ? (
          <UserDropdown user={session.user} />
        ) : (
          <div className="flex space-x-2">
            <Link href="/login" className="hover:bg-zinc-800 flex items-center justify-center text-md font-semibold transition-all rounded-md px-3.5 my-[0.5px]">
              Log In
            </Link>
            <Link href="/register" className="bg-sky-600 hover:bg-sky-700 border border-black h-full px-2.5 flex items-center justify-center rounded-md text-md font-semibold transition-all">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}