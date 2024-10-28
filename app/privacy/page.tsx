import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MyFitHub Privacy Policy",
  description: "",
};

export default async function Privacy() {
  return (
    <main className="flex grow items-start justify-center">
      <div className="flex w-full max-w-5xl grow flex-col justify-center px-4 py-16">
        <div className="space-y-5">
          <h1 className="text-2xl font-bold">MyFitHub Privacy Policy</h1>
          <p className="text-zinc-400">
            Your privacy is important to us. It is MyFitHub&apos;s policy to
            respect your privacy regarding any information we may collect from
            you across our website, https://www.myfithub.link, and other sites
            we own and operate.
          </p>
          <p className="text-zinc-400">
            1. Information We Collect <br />
            We only collect information about you if we have a reason to do so –
            for example, to provide our services, to communicate with you, or to
            make our services better. a. Information You Provide to Us: We
            collect information that you voluntarily provide to us, such as your
            name, email address, and any other information you choose to
            provide. b. Information We Collect Automatically: We automatically
            collect certain information about your device and how you interact
            with our website. This information may include your IP address,
            browser type, operating system, and other usage details.
          </p>
          <p className="text-zinc-400">
            2. How We Use Your Information <br />
            We may use the information we collect for various purposes,
            including to: a. Provide, maintain, and improve our services. b.
            Communicate with you, including responding to your inquiries and
            providing customer support. c. Personalize your experience and
            deliver relevant content and advertisements. d. Detect, prevent, and
            address technical issues and security vulnerabilities.
          </p>
          <p className="text-zinc-400">
            3. How We Share Your Information <br />
            We may share your information with third parties for various
            purposes, including to: a. Facilitate our services, such as hosting
            our website and processing payments. b. Comply with legal
            obligations or respond to lawful requests from law enforcement
            agencies. c. Protect our rights, property, or safety, or the rights,
            property, or safety of others.
          </p>
          <p className="text-zinc-400">
            4. Your Rights and Choices <br />
            You have certain rights regarding your personal information,
            including the right to access, correct, or delete your information.
            You may also have the right to object to certain processing
            activities or request restrictions on how your information is used.
          </p>
          <p className="text-zinc-400">
            5. Security <br />
            We take reasonable measures to protect your information from
            unauthorized access, use, or disclosure. However, no method of
            transmission over the internet or electronic storage is completely
            secure, so we cannot guarantee absolute 100% security.
          </p>
          <p className="text-zinc-400">
            6. Changes to This Privacy Policy <br />
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page.
            You are advised to review this Privacy Policy periodically for any
            changes.
          </p>
          <p className="text-zinc-400">
            7. Contact Us <br />
            If you have any questions about our Privacy Policy, please contact
            us at{" "}
            <a
              href="mailto:myfithub.link@gmail.com"
              className="hover:underline"
            >
              myfithub.link@gmail.com
            </a>{" "}
            and we will get back to you as soon as possible.
          </p>
          <p className="text-zinc-400">Last updated: April 10th, 2024</p>
          <Link className="flex overflow-y-clip" href="/">
            <div className="sm:mr-0.5 sm:-translate-y-[2.5px] sm:scale-x-150 sm:scale-y-[2]">
              ←
            </div>
            &nbsp;Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
