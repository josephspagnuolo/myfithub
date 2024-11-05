import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Card from "@/components/card";
import DeleteAccountButton from "@/components/delete-account";
import EditAccountButton from "@/components/edit-account";
import EditProfileButton from "@/components/edit-profile";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import Image from "next/image";

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
    },
  });

  if (!user) {
    return (
      <main className="flex grow flex-col">
        <span className="text-sm text-zinc-400">
          Please sign in or refresh the page.
        </span>
      </main>
    );
  }

  return (
    <main className="flex grow justify-center">
      <div className="flex w-full max-w-5xl grow flex-col items-center space-y-5 p-4">
        <span className="w-full pb-2.5 text-left text-3xl font-medium">
          Your Settings
        </span>
        <Card>
          <div className="mb-2 flex flex-col -space-y-0.5">
            <span className="text-lg font-semibold">Profile</span>
            <span className="text-sm text-zinc-400">
              Your current profile details are shown here
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-zinc-400">Image</span>
            <div className="flex">
              <Image
                src={user.image ? user.image : "/user.png"}
                alt="Profile Image"
                width={180}
                height={180}
                className="h-[180px] w-[180px] rounded-full object-cover object-center"
                priority
              />
              <div className="flex -translate-x-12 items-end pb-2">
                <EditProfileButton id={userId} image={user?.image || ""} />
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <div className="mb-2 flex flex-col -space-y-0.5">
            <span className="text-lg font-semibold">Account</span>
            <span className="text-sm text-zinc-400">
              Your current account details are shown here
            </span>
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
            <EditAccountButton
              id={userId}
              name={user?.name || ""}
              email={user?.email || ""}
            />
          </div>
        </Card>
        <Card>
          <div className="mb-2 flex flex-col -space-y-0.5">
            <span className="text-lg font-semibold">Delete account</span>
            <span className="text-sm text-zinc-400">
              You may permanently delete your MyFitHub account if you wish
            </span>
          </div>
          <div>
            <DeleteAccountButton id={userId} />
          </div>
        </Card>
      </div>
    </main>
  );
}
