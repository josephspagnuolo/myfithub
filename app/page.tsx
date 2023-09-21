import { getServerSession } from "next-auth/next";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex h-screen">
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <Image
          width={512}
          height={512}
          src="/logo.png"
          alt="MyFitHub"
          className="w-48 h-48"
        />
        <div className="text-center max-w-screen-sm mb-10">
          <h1 className="text-stone-200 font-bold text-2xl">
            MyFitHub
          </h1>
          <p className="text-stone-400 mt-5">
            This is your hub for tracking your fitness progress
          </p>
        </div>
        <div className="flex space-x-3">
          <Link href="/register">
            <button className="border-black bg-sky-800 text-gray-300 hover:bg-sky-900 flex h-12 w-48 items-center justify-center rounded-md border text-md font-semibold transition-all focus:outline-none">
              Get started
            </button>
          </Link>
        </div>
        <div className="text-center max-w-screen-sm mb-10">
          <p className="text-stone-400 mt-5">
            {`The date today is ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} `}
            {`The date one year ago was ${new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toLocaleString()}`}
          </p>
        </div>
      </div>
    </div>
  );
}
