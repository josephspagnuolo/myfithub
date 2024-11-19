// These styles apply to every route in the application
import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import NavBar from "@/components/navbar";
import { FaGithub } from "react-icons/fa";

const title = "MyFitHub";
const description =
  "This is MyFitHub - Your Hub for Tracking your Fitness Progress";

export const metadata: Metadata = {
  title,
  description,
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  metadataBase: new URL("https://www.myfithub.link"),
};

export const viewport: Viewport = {
  themeColor: "black",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-svh flex-col bg-black leading-snug text-zinc-50">
        <Toaster />
        <NavBar />
        {children}
        <footer className="bottom-2.5 flex items-center justify-center py-4 text-xs text-zinc-400">
          <div className="flex flex-col-reverse justify-center space-y-1 space-y-reverse md:flex-row md:space-x-5 md:space-y-0">
            <p>&copy; 2024 MyFitHub.link - All rights reserved.</p>
            <div className="flex flex-row justify-center space-x-5">
              <Link href="/terms">Terms</Link>
              <Link href="/privacy">Privacy</Link>
              <a
                href="https://github.com/josephspagnuolo/myfithub"
                target="_blank"
                className="flex items-end"
              >
                <FaGithub size={14} />
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
