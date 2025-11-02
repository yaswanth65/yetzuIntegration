import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Cookie from "js-cookie";

// Define protected routes (accessible only when logged in)
const protectedRoutes = [
  "/dashboard",
  "/profile",
  "/settings",
  "/account",
  "/home",
];

// Define public auth routes (accessible only when logged out)
const authRoutes = [
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/otp-verification",
];

export function middleware(request: NextRequest) {
  const isUserLoggedIn = Cookie.get("jwtToken") ? true : false;
  const { pathname } = request.nextUrl;

  // Check route categories
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  console.log(isUserLoggedIn);

  // Case 1️⃣: Not logged in → trying to access protected route
  if (!isUserLoggedIn && isProtected) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Case 2️⃣: Logged in → trying to access auth route
  if (isUserLoggedIn && isAuthRoute) {
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // Case 3️⃣: Allow everything else
  return NextResponse.next();
}

// Apply middleware to all routes except static files and Next internals
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|api/public).*)"],
};
