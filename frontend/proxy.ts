import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ✅ MUST be named export: middleware
export function proxy(req: NextRequest) {
  const role = req.cookies.get("role")?.value;
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (pathname.startsWith("/student")) {
    if (role !== "STUDENT") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

// ✅ matcher config
export const config = {
  matcher: ["/admin/:path*", "/student/:path*"],
};