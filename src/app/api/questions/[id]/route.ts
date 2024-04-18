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

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const token = await getToken({ req: req, secret: process.env.JWT_SECRET });
    if (token.role == "admin") {
      if (req.nextUrl.searchParams.get("testId")) {
        if (req.nextUrl.searchParams.get("action") == "add") {
          const result = await prisma.questions.update({
            where: { id: context.params.id },
            data: {
              testId: {
                push: req.nextUrl.searchParams.get("testId"),
              },
            },
          });
          return result != null
            ? NextResponse.json(
                { message: "success", data: result },
                { status: 200 }
              )
            : NextResponse.json(
                { message: "Failed to update" },
                { status: 400 }
              );
        } else if (req.nextUrl.searchParams.get("action") == "remove") {
          // Fetch the question
          const question = await prisma.questions.findUnique({
            where: { id: context.params.id },
          });

          // Remove the test ID from the testId array
          const updatedTestIdArray = question.testId.filter(
            (id) => id !== req.nextUrl.searchParams.get("testId")
          );

          // Update the question
          const updatedQuestion = await prisma.questions.update({
            where: { id: context.params.id },
            data: {
              testId: updatedTestIdArray,
            },
          });
          return updatedQuestion != null
            ? NextResponse.json(
                { message: "success", data: updatedQuestion },
                { status: 200 }
              )
            : NextResponse.json(
                { message: "Failed to update" },
                { status: 400 }
              );
        }
      }
      const result = await prisma.questions.update({
        where: { id: context.params.id },
        data: req.body,
      });
      return result != null
        ? NextResponse.json(
            { message: "success", data: result },
            { status: 200 }
          )
        : NextResponse.json({ message: "Failed to update" }, { status: 400 });
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
