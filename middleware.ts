import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/"]);
const isAuthRoute = createRouteMatcher(["/auth(.*)"]);

export default clerkMiddleware(
  (auth, req, next) => {
    // Redirect unauthenticated users to sign-in page with a toast
    if (!auth().userId && !isPublicRoute(req) && !isAuthRoute(req)) {
      const signInUrl = new URL("/auth/sign-in", req.nextUrl.origin);
      signInUrl.searchParams.set("showToast", "true");
      return NextResponse.redirect(signInUrl);
    }

    // Redirect authenticated users away from auth routes
    if (auth().userId && isAuthRoute(req)) {
      const homeUrl = new URL("/", req.nextUrl.origin);
      return NextResponse.redirect(homeUrl);
    }

    // Allow other requests to proceed normally
    return NextResponse.next();
  }
  // { debug: true }
);

export const config = {
  matcher: [
    // Match all routes except those listed (static files, API routes, etc.)
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
