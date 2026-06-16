import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authRoutes = [
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/otp-verification",
];

const protectedRoutes = ["/a", "/e", "/s", "/profile"];

const publicRoutes = [
  "/",
  "/about",
  "/assignments",
  "/blog",
  "/contact-us",
  "/courses",
  "/legal",
  "/cart",
  "/awards",
];

const getDashboardUrl = (role?: string | null) => {
  switch ((role || "").toLowerCase()) {
    case "admin":
      return "/a/dashboard";
    case "educator":
      return "/e/dashboard";
    case "student":
      return "/s/dashboard";
    default:
      return "/";
  }
};

const isRouteMatch = (pathname: string, route: string) =>
  route === "/" ? pathname === "/" : pathname === route || pathname.startsWith(`${route}/`);

export function middleware(request: NextRequest) {
  const isUserLoggedIn = request.cookies.get("isUserLoggedIn")?.value === "true" ||
    Boolean(request.cookies.get("jwtToken")?.value);
  const userRole = request.cookies.get("userRole")?.value;
  const { pathname, search } = request.nextUrl;

  const isAuthRoute = authRoutes.some((route) => isRouteMatch(pathname, route));
  const isPublic = publicRoutes.some((route) => isRouteMatch(pathname, route));
  const isProtected = protectedRoutes.some((route) => isRouteMatch(pathname, route));

  if (!isUserLoggedIn && isProtected && !isPublic) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callback", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  if (isUserLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL(getDashboardUrl(userRole), request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|api/public/admin-).*)"],
};
