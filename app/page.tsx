import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { FaArrowRight } from "react-icons/fa";

export const metadata: Metadata = {
  title: 'MyFitHub',
  description: "This is your Hub for everything Fitness. Track your Progress, Visualize your Results, Improve your Health",
}

export default async function Home() {
  return (
    <main className="flex grow">
      <div className="w-screen flex flex-col justify-center items-center p-3">
        <a href="https://github.com/josephspagnuolo/myfithub" target="_blank" className="card-wrapper w-[165px] h-7 group">
          <div className="card-content flex items-center justify-center text-sm sm:pb-px">We are Open Source<FaArrowRight className="ml-1 mt-0.5 group-hover:translate-x-1 transition-transform duration-150 ease-in-out" size={10} /></div>
        </a>
        <p className="mt-5 sm:mt-3 cursor-default max-w-[525px] lg:max-w-[700px] text-center text-7xl lg:text-8xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white to-zinc-400 leading-[0.92]">
          Explore a new world of fitness
        </p>
        <div className="text-center max-w-screen-sm mt-5">
          <p className="text-xl text-zinc-400">
            This is your hub for tracking your fitness progress
          </p>
        </div>
        <div className="flex space-x-3 mt-8">
          <Link href="/register">
            <button className="bg-sky-800 hover:bg-sky-900 hover:text-zinc-400 border border-black h-12 w-48 flex items-center justify-center rounded-md text-md font-semibold transition-all focus:outline-none">
              Get started
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
