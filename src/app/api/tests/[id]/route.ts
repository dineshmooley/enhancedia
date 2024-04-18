import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const token = await getToken({
      req,
      secret: process.env.JWT_SECRET,
    });
    if (token.role == "admin") {
      const test = await prisma.test.findUnique({
        where: { id: context.params.id },
      });
      return NextResponse.json(
        { message: "success", data: test },
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
      { message: "Error catch block", error: err.toString() },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const token = await getToken({
      req,
      secret: process.env.JWT_SECRET,
    });
    if (token.role == "admin") {
      const test = await prisma.test.delete({
        where: { id: context.params.id },
      });
      return NextResponse.json(
        { message: "successfully deleted" },
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
      { message: "Error catch block", error: err.toString() },
      { status: 500 }
    );
  }
}
