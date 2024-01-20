// These styles apply to every route in the application
import "@/styles/globals.css";
import { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import AuthStatus from "@/components/auth-status";
import { Suspense } from "react";

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
  metadataBase: new URL("https://myfithub.vercel.app"),
  themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#191919] text-gray-300 flex flex-col  min-h-[88vh] sm:min-h-screen">
        <Toaster />
        <Suspense fallback="Loading...">
          <AuthStatus />
        </Suspense>
        {children}
        <footer className="bottom-2.5 w-full flex justify-center items-center text-gray-400 text-xs py-4">
          <p>&copy; 2024 MyFitHub.ca - All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
