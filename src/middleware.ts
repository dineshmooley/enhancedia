import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });
    console.log("req", req.nextUrl.pathname);
    if (token.role == "student") {
      const allowedUrls = [`/class/${token.classId}`, `/profile/${token.id}`];
      if (
        !allowedUrls.includes(req.nextUrl.pathname) &&
        req.nextUrl.pathname.split("/")[1] !== "test"
      ) {
        return NextResponse.rewrite(
          new URL(`/class/${token.classId}`, req.nextUrl)
        );
      }
      return NextResponse.rewrite(new URL(req.nextUrl.pathname, req.nextUrl));
    }
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
