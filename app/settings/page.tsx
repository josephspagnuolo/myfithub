import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DeleteAccountButton from "@/components/delete-account";
import EditAccountButton from "@/components/edit-account";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";

export default async function Settings() {
  const session = await getServerSession(authOptions);
  const userId = session!.user!.id;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      providerId: true,
    }
  });

  if (!user) {
    return (
      <main className="flex flex-col grow">
        <span className="text-zinc-400 text-sm">Please sign in or refresh the page.</span>
      </main>
    );
  }

  return (
    <main className="flex flex-col grow">
      <div className="flex flex-col w-full grow space-y-5 items-center p-4">
        <span className="text-3xl font-medium text-left w-full max-w-[950px] pb-2.5">Your Settings</span>
        <div className="w-full max-w-[950px] overflow-hidden rounded-2xl border border-zinc-800 shadow-xl bg-stone-900 flex flex-col space-y-3 p-6">
          <div className="flex flex-col mb-3">
            <span className="text-lg font-semibold">Account</span>
            <span className="text-zinc-400 text-sm">Your current account details are shown here</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-zinc-400">Name</span>
            <span>{user?.name}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-zinc-400">Email</span>
            <span>{user?.email}</span>
          </div>
          <div className="pt-2">
            <EditAccountButton id={user?.id} name={user?.name || ""} />
          </div>
        </div>
        <div className="w-full max-w-[950px] overflow-hidden rounded-2xl border border-zinc-800 shadow-xl bg-stone-900 flex flex-col space-y-3 p-6">
          <div className="flex flex-col mb-3">
            <span className="text-lg font-semibold">Delete account</span>
            <span className="text-zinc-400 text-sm">You may permanently delete your MyFitHub account if you wish</span>
          </div>
          <div>
            <DeleteAccountButton id={userId} />
          </div>
        </div>
      </div>
    </main>
  );
}

