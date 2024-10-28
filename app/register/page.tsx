import AuthOptions from "@/components/auth-options";
import Card from "@/components/card";

export default function Login() {
  return (
    <main className="flex grow justify-center">
      <div className="flex w-full max-w-5xl grow flex-col items-center justify-center space-y-5 p-4">
        <div className="flex w-full max-w-lg">
          <Card>
            <div className="flex flex-col items-center justify-center space-y-1 border-zinc-800 pb-1 text-center">
              <h3 className="text-2xl font-semibold">Welcome</h3>
              <p className="text-sm text-zinc-400">
                Get started with your MyFitHub account
              </p>
            </div>
            <AuthOptions type="register" />
          </Card>
        </div>
      </div>
    </main>
  );
}
