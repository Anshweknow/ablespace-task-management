import { NextResponse, type NextRequest } from "next/server";
const publicRoutes = ["/login", "/register"];
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublic = publicRoutes.some((route) => pathname.startsWith(route));
  // Client-side auth state is stored in localStorage, so this middleware documents route intent
  // without redirecting before hydration. API-level JWT guards remain authoritative.
  return NextResponse.next({
    headers: { "x-route-visibility": isPublic ? "public" : "protected" },
  });
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
