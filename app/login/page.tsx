import AuthOptions from "@/components/auth-options";

export default function Login() {
  return (
    <main className="flex grow items-center justify-center">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-800 shadow-xl bg-stone-900 mx-3">
        <div className="flex flex-col items-center justify-center space-y-1 border-zinc-800 p-4 sm:px-8 text-center">
          <h3 className="text-2xl font-semibold">Welcome Back</h3>
          <p className="text-sm text-zinc-400">
            Log in to your MyFitHub account
          </p>
        </div>
        <AuthOptions type="login" />
      </div>
    </main>
  );
}
