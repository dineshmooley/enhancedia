import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import bcrypt from "bcrypt";
import prisma from "../../../../prisma/Prisma";

export async function GET(request: NextRequest) {
  try {
    //console.log("the query is ", request.nextUrl.searchParams.get("role"));
    const token = await getToken({
      req: request,
      secret: process.env.JWT_SECRET,
    });
    if (token.role == "admin") {
      if (request.nextUrl.searchParams.get("role") == "staff") {
        const users = await prisma.staff.findMany();
        return NextResponse.json({ message: users }, { status: 200 });
      } else if (request.nextUrl.searchParams.get("role") == "student") {
        const users = await prisma.student.findMany();
        return NextResponse.json({ message: users }, { status: 200 });
      }
    } else {
      return NextResponse.json({ message: "Unauthorized" }, { status: 402 });
    }
  } catch (err) {
    return NextResponse.json(
      { message: "Error catch block", error: err.toString() },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userdata = await request.json();
    //console.log("the query is ", request.nextUrl.searchParams.get("role"));
    const token = await getToken({
      req: request,
      secret: process.env.JWT_SECRET,
    });
    if (token.role == "admin") {
      //check if data exists
      if (!userdata.email || !userdata.password) {
        return NextResponse.json(
          { message: "Please enter all fields" },
          { status: 400 }
        );
      }
      if (request.nextUrl.searchParams.get("role") == "staff") {
        //check if user exists
        const duplicate = await prisma.staff.findUnique({
          where: { email: userdata.email },
        });
        if (duplicate) {
          return NextResponse.json(
            { message: "User already" },
            { status: 409 }
          );
        }
        //hash password
        const hashedPassword = await bcrypt.hash(userdata.password, 10);
        userdata.password = hashedPassword;
        //create user
        const user = await prisma.staff.create({
          data: userdata,
        });
        console.log("the user created", user.email);
        return NextResponse.json({ message: "user created" }, { status: 201 });
      } else if (request.nextUrl.searchParams.get("role") == "student") {
        //check if user exists
        const duplicate = await prisma.student.findUnique({
          where: { email: userdata.email },
        });
        if (duplicate) {
          return NextResponse.json(
            { message: "User already" },
            { status: 409 }
          );
        }
        //hash password
        const hashedPassword = await bcrypt.hash(userdata.password, 10);
        userdata.password = hashedPassword;
        //create user
        const user = await prisma.student.create({
          data: userdata,
        });
        console.log("the user created", user.email);
        return NextResponse.json({ message: "user created" }, { status: 201 });
      }
    } else {
      return NextResponse.json({ message: "Unauthorized" }, { status: 402 });
    }
  } catch (err) {
    return NextResponse.json(
      { message: "Error catch block", error: err.toString() },
      { status: 500 }
    );
  }
}
