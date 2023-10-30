import { getServerSession } from "next-auth/next";

export default async function AuthStatus() {
  const session = await getServerSession();
  return (
    <div className="absolute top-2.5 w-full flex justify-center items-center">
      {session && (
        <p className="text-stone-400 text-sm">
          Signed in as {session.user?.name}
        </p>
      )}
    </div>
  );
}
