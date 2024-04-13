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
  metadataBase: new URL("https://www.myfithub.ca"),
};

export const viewport: Viewport = {
  themeColor: "#191919",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#191919] text-gray-300 flex flex-col min-h-[88vh] sm:min-h-screen">
        <Toaster />
        <NavBar />
        {children}
        <footer className="bottom-2.5 flex justify-center items-center text-gray-400 text-xs py-4">
          <div className="flex justify-center flex-col-reverse space-y-1 space-y-reverse md:space-y-0 md:flex-row md:space-x-5">
            <p>&copy; 2024 MyFitHub.ca - All rights reserved.</p>
            <div className="flex justify-center flex-row space-x-5">
              <Link href="/terms">Terms</Link>
              <Link href="/privacy">Privacy</Link>
              <a href="https://github.com/josephspagnuolo/myfithub" target="_blank" className="flex items-end"><FaGithub size={14} /></a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
