// These styles apply to every route in the application
import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
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
        <Suspense fallback="Loading...">
          <AuthStatus />
        </Suspense>
        {children}
        <footer className="bottom-2.5 flex justify-center items-center text-gray-400 text-xs py-4">
          <div className="flex justify-center flex-col-reverse space-y-1 space-y-reverse md:space-y-0 md:flex-row md:space-x-5">
            <p>&copy; 2024 MyFitHub.ca - All rights reserved.</p>
            <div className="flex justify-center flex-row space-x-5">
              <p>Terms</p>
              <p>Privacy</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
