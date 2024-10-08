import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  // Get the pathname of the request (e.g. /, /dashboard)
  const path = req.nextUrl.pathname;

  // If it's the root path, just render it
  if (path === "/")
    return NextResponse.next();

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session && path.includes("dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  } else if (!session && path.includes("settings")) {
    return NextResponse.redirect(new URL("/login", req.url));
  } else if (session && (path === "/login" || path === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  return NextResponse.next();
}
