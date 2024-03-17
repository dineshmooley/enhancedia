import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "../../../../prisma/Prisma";

export async function GET(request: NextRequest) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.JWT_SECRET,
    });
    if (token.role == "admin") {
      const departments = await prisma.departments.findMany({
        orderBy: { name: "asc" },
      });
      return NextResponse.json(
        { message: "success", data: departments },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Unauthorized to do this operation" },
        { status: 401 }
      );
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Error catch block", error: err.toString() },
      { status: 500 }
    );
  }
}
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const token = await getToken({
      req: request,
      secret: process.env.JWT_SECRET,
    });
    if (token.role == "admin") {
      const department = await prisma.departments.create({
        data: body,
      });
      return NextResponse.json(
        { message: "success", department_id: department.id },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Unauthorized to do this operation" },
        { status: 401 }
      );
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Error catch block", error: err.toString() },
      { status: 500 }
    );
  }
}
