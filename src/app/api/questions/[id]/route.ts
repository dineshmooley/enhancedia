import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const token = await getToken({ req: req, secret: process.env.JWT_SECRET });
    if (token.role == "admin") {
      const result = await prisma.questions.findUnique({
        where: { id: context.params.id },
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
    return NextResponse.json({ message: "Failed", data: err });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const token = await getToken({ req: req, secret: process.env.JWT_SECRET });
    if (token.role == "admin") {
      const result = await prisma.questions.delete({
        where: { id: context.params.id },
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
    return NextResponse.json({ message: "Failed", data: err });
  }
}
