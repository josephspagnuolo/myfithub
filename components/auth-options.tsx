"use client";

import { Suspense, useState } from "react";
import CredentialsForm from "@/components/credentials-form";
import GitHubSigninButton from "@/components/github-signin-button";
import GoogleSigninButton from "@/components/google-signin-button";

export default function AuthOptions({
  type
}: {
  type: "login" | "register";
}) {
  const [working, setWorking] = useState(false);
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 px-4 sm:px-8 pb-2">
        <Suspense>
          <GitHubSigninButton type={type} working={working} doWorking={setWorking} />
          <GoogleSigninButton type={type} working={working} doWorking={setWorking} />
        </Suspense>
      </div>
      <div className="flex flex-row align-middle items-center">
        <div className="w-full h-0 border-[0.5px] border-b-0 border-zinc-800"></div>
        <span className="flex justify-center text-center text-sm text-zinc-400 px-2">OR</span>
        <div className="w-full h-0 border-[0.5px] border-b-0 border-zinc-800"></div>
      </div>
      <CredentialsForm type={type} working={working} doWorking={setWorking} />
    </>
  );
}