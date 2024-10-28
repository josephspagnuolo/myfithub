"use client";

import { Suspense, useState } from "react";
import CredentialsForm from "@/components/credentials-form";
import GitHubSigninButton from "@/components/github-signin-button";
import GoogleSigninButton from "@/components/google-signin-button";

export default function AuthOptions({ type }: { type: "login" | "register" }) {
  const [working, setWorking] = useState(false);
  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Suspense>
          <GitHubSigninButton
            type={type}
            working={working}
            doWorking={setWorking}
          />
          <GoogleSigninButton
            type={type}
            working={working}
            doWorking={setWorking}
          />
        </Suspense>
      </div>
      <div className="-mx-6 flex flex-row items-center align-middle">
        <div className="h-0 w-full border-[0.5px] border-b-0 border-zinc-800"></div>
        <span className="flex justify-center px-2 text-center text-sm text-zinc-400">
          OR
        </span>
        <div className="h-0 w-full border-[0.5px] border-b-0 border-zinc-800"></div>
      </div>
      <CredentialsForm type={type} working={working} doWorking={setWorking} />
    </>
  );
}
