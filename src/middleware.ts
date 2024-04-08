"use client";

import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    console.log("req", req.nextUrl.pathname);
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/((?!login|api|_next/static|_next/image|favicon.ico).*)"],
};
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   console.log("lol!!!");
// }

// export const config = {
//   matcher: ["/((?!login|api|_next/static|_next/image|favicon.ico).*)"],
// };
