"use client";

import { useState } from "react";
import CredentialsForm from "./credentials-form";
import GitHubSigninButton from "./github-signin-button";

export default function AuthOptions({
  type
}: {
  type: "login" | "register";
}) {
  const [working, setWorking] = useState(false);
  return (
    <>
      <GitHubSigninButton working={working} doWorking={setWorking} />
      <div className="flex flex-row align-middle items-center">
        <div className="w-full h-0 border-[0.5px] border-b-0 border-gray-600"></div>
        <span className="flex justify-center text-center text-sm text-gray-400 px-2">OR</span>
        <div className="w-full h-0 border-[0.5px] border-b-0 border-gray-600"></div>
      </div>
      <CredentialsForm type={type} working={working} doWorking={setWorking} />
    </>
  );
}