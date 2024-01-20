import Image from "next/image";
import Form from "@/components/form";
import Link from "next/link";

export default function Login() {
  return (
    <main className="flex grow items-center justify-center">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-600 shadow-xl bg-[#292929]">
        <div className="flex flex-col items-center justify-center space-y-2 border-b border-gray-600 px-4 py-4 pt-5 text-center sm:px-16">
          <Link href="/">
            <Image
              src="/logo.png"
              priority
              alt="Logo"
              className="h-10 w-10 rounded-full"
              width={20}
              height={20}
            />
          </Link>
          <h3 className="text-xl font-semibold">Sign Up</h3>
          <p className="text-sm text-gray-400 px-16 sm:px-0">
            Create an account at MyFitHub with your name, email and password
          </p>
        </div>
        <Form type="register" />
      </div>
    </main>
  );
}
