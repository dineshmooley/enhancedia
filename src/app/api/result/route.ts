import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });
    if (token.role == "student") {
      const result = await prisma.result.findFirst({
        where: {
          testId: req.nextUrl.searchParams.get("testId"),
          studentId: token.id,
        },
      });
      return NextResponse.json(
        { message: "success", data: result },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Unauthorized to do this operation" },
        { status: 401 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { message: "Failed", error: err },
      { status: 422 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  try {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });
    if (token.role == "student") {
      let bodyId = body.id;
      delete body.id;
      const result = await prisma.result.update({
        where: {
          id: bodyId,
        },
        data: body,
      });
      return NextResponse.json(
        { message: "success", data: result },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Unauthorized to do this operation" },
        { status: 401 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { message: "Failed", error: err, data: body },
      { status: 422 }
    );
  }
}
