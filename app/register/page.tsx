import AuthOptions from "@/components/auth-options";

export default function Login() {
  return (
    <main className="flex grow items-center justify-center">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-zinc-600 shadow-xl bg-[#1a1a1c] mx-3">
        <div className="flex flex-col items-center justify-center space-y-1 border-zinc-600 px-4 py-4 text-center sm:px-16">
          <h3 className="text-2xl font-semibold">Welcome</h3>
          <p className="text-sm text-zinc-400 px-16 sm:px-0">
            Get started with your MyFitHub account
          </p>
        </div>
        <AuthOptions type="register" />
      </div>
    </main>
  );
}
