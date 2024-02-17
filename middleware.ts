import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    console.log(req.nextUrl.pathname);
    console.log(req.nextauth.token?.role); // Add null check using the optional chaining operator

    if (req.nextauth.token?.role !== "admin" && req.nextUrl.pathname === "/") {
      return NextResponse.rewrite(new URL("/error", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = { matcher: ["/students"] };
