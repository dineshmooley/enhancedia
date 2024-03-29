import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.JWT_SECRET,
    });
    if (token.role == "admin") {
      const departments = await prisma.departments.findUnique({
        where: { id: context.params.id },
        include: { classes: true },
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
    const token = await getToken({
      req: request,
      secret: process.env.JWT_SECRET,
    });
    if (token.role == "admin") {
      const body = await request.json();
      const classinfo = await prisma.classes.create({
        data: body,
      });
      return NextResponse.json(
        { message: "success", class_id: classinfo.id },
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

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const token = await getToken({
      req: request,
      secret: process.env.JWT_SECRET,
    });
    if (token.role == "admin") {
      const department = await prisma.departments.update({
        where: { id: context.params.id },
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

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.JWT_SECRET,
    });
    if (token.role == "admin") {
      const department = await prisma.departments.delete({
        where: { id: context.params.id },
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
