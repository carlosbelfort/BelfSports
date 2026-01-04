import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  // Proteção geral
  if (pathname.startsWith("/dashboard")) {
    if (!token || !role) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (pathname.startsWith("/dashboard/admin") && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (pathname.startsWith("/dashboard/organizer") && role !== "ORGANIZER") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (
      pathname.startsWith("/dashboard/photographer") &&
      role !== "PHOTOGRAPHER"
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (pathname.startsWith("/dashboard/user") && role !== "USER") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
