import { NextRequest, NextResponse } from "next/server";
import { User } from "./app/lib/definitions";

export function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;
  const userCookies = request.cookies.get("user")?.value;

  // Handle login
  if (pathName.startsWith("/admin")) {
    if (userCookies && token) {
      const user: User = JSON.parse(userCookies);
      if (user.role === "admin" && !pathName.startsWith("/admin/dashboard")) {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      } else if (pathName.startsWith("/admin/dashboard")) {
        if (user.role !== "admin") {
          return NextResponse.redirect(new URL("/", request.url));
        }
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    if (pathName.startsWith("/admin/dashboard") && !token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Handle employee login
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (token && userCookies) {
      const user: User = JSON.parse(userCookies);
      if (user.role !== "admin" && !pathName.startsWith("/dashboard")) {
        NextResponse.redirect(new URL("/dashboard", request.url));
      } else if (pathName.startsWith("/dashboard")) {
        if (user.role === "admin") {
          return NextResponse.redirect(new URL("/", request.url));
        }
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    if (!token) return NextResponse.redirect(new URL("/login", request.url));
  }
  if (pathName == "/login") {
    if (token && userCookies) {
      const user: User = JSON.parse(userCookies);
      if (user.role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
