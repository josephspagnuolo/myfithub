import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { FaArrowRight } from "react-icons/fa";
import { IoMdFitness } from "react-icons/io";
import { MdLeaderboard, MdGroup } from "react-icons/md";
import Card from "@/components/card";

export const metadata: Metadata = {
  title: "MyFitHub",
  description:
    "This is your Hub for everything Fitness. Track your Progress, Visualize your Results, Improve your Health",
};

export default async function Home() {
  return (
    <main className="flex grow overflow-clip">
      <div className="flex w-screen flex-col items-center justify-center px-3 py-12">
        <div className="min flex h-[72dvh] min-h-96 flex-col items-center justify-center pb-8">
          <a
            href="https://github.com/josephspagnuolo/myfithub"
            target="_blank"
            className="card-wrapper group h-7 w-[165px]"
          >
            <div className="card-content flex items-center justify-center text-sm sm:pb-px">
              We are Open Source
              <FaArrowRight
                className="ml-1 mt-0.5 transition-transform duration-150 ease-in-out group-hover:translate-x-1"
                size={10}
              />
            </div>
          </a>
          <p className="mt-5 max-w-[525px] cursor-default bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-center text-7xl font-bold leading-[0.92] tracking-tight text-transparent sm:mt-3 lg:max-w-[700px] lg:text-8xl">
            Explore a new world of fitness
          </p>
          <div className="mt-5 max-w-screen-sm text-center">
            <p className="text-xl text-zinc-400">
              This is your hub for tracking your fitness progress
            </p>
          </div>
          <div className="mt-8 flex space-x-3">
            <Link
              href="/register"
              className="text-md flex h-12 w-48 items-center justify-center rounded-md border border-black bg-sky-600 font-semibold transition-all hover:bg-sky-700"
            >
              Get started
            </Link>
          </div>
        </div>
        <div className="relative mt-24 w-full max-w-5xl p-4">
          <div className="absolute -top-8 left-1/2 -z-10 h-[75%] w-[75%] -translate-x-1/2 rounded-lg bg-gradient-to-t from-sky-500/20 to-transparent blur-2xl" />
          <div className="absolute -top-8 left-1/2 -z-10 h-[60%] w-[65%] -translate-x-1/4 rounded-lg bg-gradient-to-tr from-sky-500/20 to-transparent blur-2xl" />
          <div className="absolute -top-8 left-1/2 -z-10 h-[60%] w-[65%] -translate-x-3/4 rounded-lg bg-gradient-to-tl from-sky-500/20 to-transparent blur-2xl" />
          <div className="absolute -top-6 left-1/2 -z-10 h-[50%] w-[85%] -translate-x-3/4 rounded-lg bg-gradient-to-l from-sky-500/25 to-transparent blur-2xl" />
          <div className="absolute -top-6 left-1/2 -z-10 h-[50%] w-[85%] -translate-x-1/4 rounded-lg bg-gradient-to-r from-sky-500/25 to-transparent blur-2xl" />
          <div className="flex flex-col rounded-lg border border-zinc-800 shadow-lg">
            <div className="h-6 rounded-t-lg bg-black"></div>
            <Image
              src="/dash-image.png"
              alt="MyFitHub Dashboard preview"
              width={1600}
              height={975}
            />
            <div className="h-6 rounded-b-lg bg-black"></div>
          </div>
          <div className="absolute -bottom-8 left-1/2 -z-10 h-[75%] w-[75%] -translate-x-1/2 rounded-lg bg-gradient-to-b from-sky-500/20 to-transparent blur-2xl" />
          <div className="absolute -bottom-8 left-1/2 -z-10 h-[60%] w-[65%] -translate-x-1/4 rounded-lg bg-gradient-to-br from-sky-500/20 to-transparent blur-2xl" />
          <div className="absolute -bottom-8 left-1/2 -z-10 h-[60%] w-[65%] -translate-x-3/4 rounded-lg bg-gradient-to-bl from-sky-500/20 to-transparent blur-2xl" />
          <div className="absolute -bottom-6 left-1/2 -z-10 h-[50%] w-[85%] -translate-x-3/4 rounded-lg bg-gradient-to-l from-sky-500/25 to-transparent blur-2xl" />
          <div className="absolute -bottom-6 left-1/2 -z-10 h-[50%] w-[85%] -translate-x-1/4 rounded-lg bg-gradient-to-r from-sky-500/25 to-transparent blur-2xl" />{" "}
        </div>
        <div className="mb-[16dvh] mt-[25dvh] max-w-3xl text-center">
          <h2 className="text-3xl font-bold">
            Your Ultimate Fitness Companion
          </h2>
          <p className="mt-2 text-zinc-400">
            Track, visualize, and elevate your fitness journey.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <Card>
              <div className="flex justify-center">
                <IoMdFitness className="mb-1 text-3xl text-sky-600" />
              </div>
              <h3 className="text-lg font-semibold">Track Progress</h3>
              <p className="mt-1 text-sm text-zinc-400">
                Log workouts, monitor improvement, and achieve your goals.
              </p>
            </Card>
            <Card>
              <div className="flex justify-center">
                <MdLeaderboard className="mb-1 text-3xl text-sky-600" />
              </div>
              <h3 className="text-lg font-semibold">Visualize Results</h3>
              <p className="mt-1 text-sm text-zinc-400">
                Analyze trends and get insights with data-driven visualizations.
              </p>
            </Card>
            <Card>
              <div className="flex justify-center">
                <MdGroup className="mb-1 text-3xl text-sky-600" />
              </div>
              <h3 className="text-lg font-semibold">Join the Community</h3>
              <p className="mt-1 text-sm text-zinc-400">
                Connect with others, share progress, and stay motivated
                together.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
