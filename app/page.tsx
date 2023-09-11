import Image from "next/image";
import Link from "next/link";

export default function Home() {
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
          <Link
            href="/protected"
            className="text-stone-400 underline hover:text-stone-200 transition-all"
          >
            Protected Page
          </Link>
        </div>
      </div>
    </div>
  );
}
