import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
  "/dashboard",
  "/profile",
  "/settings",
  "/account",
  "/home",
  // "/s",
  "/a",
  // "/e",
];

const authRoutes = [
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/otp-verification",
];

const publicRoutes = [
  "/e/dashboard",
  "/assignments",
  "/about",
  "/courses",
  "/blog",
  "/contact-us",
  "/legal",
];

export function middleware(request: NextRequest) {
  const isUserLoggedIn = request.cookies.get("isUserLoggedIn")?.value;
  const { pathname } = request.nextUrl;

  const isPublic = publicRoutes.some((route) => pathname.startsWith(route));
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (!isUserLoggedIn && isProtected && !isPublic) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isUserLoggedIn && isAuthRoute) {
    const dashboardUrl = new URL("/", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|api/public).*)"],
};
