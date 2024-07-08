import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'MyFitHub Terms & Conditions',
  description: "",
}

export default async function Terms() {
  return (
    <main className="flex justify-center grow items-start">
      <div className="flex justify-center flex-col px-4 py-16">
        <div className="space-y-5 max-w-5xl">
          <h1 className="font-bold text-2xl">
            MyFitHub Terms of Service
          </h1>
          <p className="text-zinc-400">
            Thank you for using MyFitHub! We&apos;re happy you&apos;re here. Please read this Terms of Service agreement carefully before accessing or using MyFitHub.
          </p>
          <p className="text-zinc-400">
            1. Acceptance of Terms <br />
            By accessing or using MyFitHub, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not access or use MyFitHub.
          </p>
          <p className="text-zinc-400">
            2. Description of Service <br />
            MyFitHub is a platform designed to help users track their fitness progress, set goals, and connect with other fitness enthusiasts. The service may include, but is not limited to, features such as workout tracking, goal setting, and community forums.
          </p>
          <p className="text-zinc-400">
            3. User Conduct <br />
            You agree to use MyFitHub in compliance with all applicable laws and regulations. You also agree not to:
            a. Use MyFitHub for any unlawful purpose or to engage in any illegal activities.
            b. Post or transmit any content that is infringing, libelous, defamatory, obscene, or otherwise objectionable.
            c. Interfere with or disrupt the operation of MyFitHub or the servers or networks connected to MyFitHub.
            d. Attempt to gain unauthorized access to any part of MyFitHub or its related systems or networks.
          </p>
          <p className="text-zinc-400">
            4. Privacy Policy <br />
            Your privacy is important to us. Please review our Privacy Policy <Link href="/privacy" className="hover:underline">here</Link> to understand how we collect, use, and disclose your information.
          </p>
          <p className="text-zinc-400">
            5. Intellectual Property <br />
            All content and materials available on MyFitHub, including but not limited to text, graphics, logos, images, and software, are the property of MyFitHub or its licensors and are protected by copyright, trademark, and other intellectual property laws.
          </p>
          <p className="text-zinc-400">
            6. Disclaimer of Warranties <br />
            MyFitHub is provided &quot;as is&quot; and &quot;as available&quot; without any warranties of any kind, express or implied. We do not warrant that MyFitHub will be error-free or uninterrupted, or that any defects will be corrected. Your use of MyFitHub is at your own risk.
          </p>
          <p className="text-zinc-400">
            7. Limitation of Liability <br />
            In no event shall MyFitHub or its affiliates, officers, directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of MyFitHub.
          </p>
          <p className="text-zinc-400">
            8. Modifications to Terms of Service <br />
            MyFitHub reserves the right to modify or update these Terms of Service at any time without prior notice. Your continued use of MyFitHub after any changes to these terms constitutes acceptance of those changes.
          </p>
          <p className="text-zinc-400">
            If you have any questions about these Terms of Service, please contact us at <a href="mailto:myfithub.link@gmail.com" className="hover:underline">myfithub.link@gmail.com</a> and we will get back to you as soon as possible.
          </p>
          <p className="text-zinc-400">
            Last updated: April 10th, 2024
          </p>
          <Link className="flex overflow-y-clip" href="/"><div className="sm:scale-y-[2] sm:scale-x-150 sm:-translate-y-[2.5px] sm:mr-0.5">←</div>&nbsp;Back to home</Link>
        </div>
      </div>
    </main>
  );
}
