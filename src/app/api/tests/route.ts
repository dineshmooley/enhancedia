import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "Hello World" });
}

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.SECRET });
    const body = await req.json();
    if (token.role === "admin") {
      const result = await prisma.test.create({
        data: {
          ...body,
        },
      });
      const classes = await prisma.classes.findUniqueOrThrow({
        where: { id: body.classId as string },
        include: {
          students: true,
        },
      });
      let datalist = [];
      for (const student of classes.students) {
        datalist.push({
          studentId: student.id,
          testId: result.id,
          classId: body.classId,
          status: "pending",
          started_at: new Date().toISOString(),
          ended_at: new Date(Date.now() + 20 * 60 * 1000).toISOString(),
        });
      }
      await prisma.result.createMany({
        data: datalist,
      });
      return NextResponse.json(
        { message: "success", data: result },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Failed", error: "Unauthorized" },
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
