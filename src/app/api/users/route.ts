import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "../../../../prisma/Prisma";

export async function GET(request: NextRequest) {
  try {
    const users = await prisma.staff.findMany();
    return NextResponse.json({ message: users }, { status: 200 });
  } catch (err) {
    console.log(err);
  }
}

export async function POST(request: NextRequest, context: any) {
  try {
    const userdata = await request.json();
    //const userdata = body.formdata;
    userdata.role = "admin";
    console.log(userdata);

    //check if data exists
    if (!userdata.email || !userdata.password) {
      return NextResponse.json(
        { message: "Please enter all fields" },
        { status: 400 }
      );
    }
    //check if user exists
    const duplicate = await prisma.staff.findUnique({
      where: { email: userdata.email },
    });
    if (duplicate) {
      return NextResponse.json({ message: "User already" }, { status: 409 });
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
  } catch (err) {
    return NextResponse.json({ message: "Error catch block" }, { status: 500 });
  }
}
