import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'MyFitHub',
  description: "This is your Hub for everything Fitness. Track your Progress, Visualize your Results, Improve your Health",
}

export default async function Home() {
  return (
    <main className="flex grow">
      <div className="w-screen flex flex-col justify-center items-center">
        <Image
          src="/logo.png"
          priority
          alt="MyFitHub Logo"
          className="w-48 h-48 rounded-full"
          width={512}
          height={512}
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
            <button className="bg-sky-800 hover:bg-sky-900 text-gray-300 hover:text-gray-400 border border-black h-12 w-48 flex items-center justify-center rounded-md text-md font-semibold transition-all focus:outline-none">
              Get started
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
