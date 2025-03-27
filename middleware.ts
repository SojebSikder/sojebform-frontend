import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

// Protect specific pages
export const config = {
  matcher: ["/dashboard/:path*"], // Apply middleware to `/dashboard` and its subroutes
};
