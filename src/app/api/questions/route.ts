import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({
      req: req,
      secret: process.env.JWT_SECRET,
    });
    if (token.role == "admin") {
      if (req.nextUrl.searchParams.get("id") == "topics") {
        const result = await prisma.questions.groupBy({
          by: ["topic"],
          where: {
            topic: {
              not: null,
            },
          },
        });
        const transfomed = result.map((obj) => ({
          label: obj.topic,
          value: obj.topic,
        }));
        return NextResponse.json({ topics: transfomed }, { status: 200 });
      }
      if (req.nextUrl.searchParams.get("topic")) {
        const data = await prisma.questions.findMany({
          where: {
            topic: req.nextUrl.searchParams.get("topic"),
          },
        });
        return data != undefined
          ? NextResponse.json(
              { message: "success", data: data },
              { status: 200 }
            )
          : NextResponse.json({ message: "No data found" }, { status: 404 });
      }
      if (req.nextUrl.searchParams.get("type") == "psychometric") {
        const data = await prisma.questions.findMany({
          where: {
            type: "psychometric",
          },
        });
        return data != undefined
          ? NextResponse.json(
              { message: "success", data: data },
              { status: 200 }
            )
          : NextResponse.json({ message: "No data found" }, { status: 404 });
      }
      if (req.nextUrl.searchParams.get("type")) {
        const topics = Array.from(
          new Set(
            (
              await prisma.questions.findMany({
                where: {
                  type: req.nextUrl.searchParams.get("type"),
                },
                select: {
                  topic: true,
                },
              })
            ).map((question) => question.topic)
          )
        ).map((topic) => ({ label: topic, value: topic }));
        return topics.length > 0
          ? NextResponse.json({ topics: topics }, { status: 200 })
          : NextResponse.json({ message: "No data found" }, { status: 404 });
      }
      const data = await prisma.questions.findMany();
      return NextResponse.json({ data: data }, { status: 200 });
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

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req: req, secret: process.env.JWT_SECRET });
    if (token.role == "admin") {
      const body = await req.json();
      const result = await prisma.questions.create({
        data: body,
      });
      return NextResponse.json(
        { message: "Success", data: result },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: "Unauthorized" });
    }
  } catch (err) {
    return NextResponse.json({ message: "Failed", data: err }, { status: 422 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const token = await getToken({ req: req, secret: process.env.JWT_SECRET });
    if (token.role == "admin") {
      const id = context.params.id;
      const result = await prisma.questions.delete({
        where: {
          id: id,
        },
      });
      return NextResponse.json({ message: "Success", data: result });
    } else {
      return NextResponse.json({ message: "Unauthorized" });
    }
  } catch (err) {
    return NextResponse.json({ message: "Failed", data: err });
  }
}
