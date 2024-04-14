import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import bcrypt from "bcrypt";
import prisma from "../../../../prisma/Prisma";

export async function GET(request: NextRequest) {
  try {
    const url = request.nextUrl.searchParams.get("role");
    const token = await getToken({
      req: request,
      secret: process.env.JWT_SECRET,
    });
    if (token.role == "admin") {
      if (url == "staffs") {
        if (request.nextUrl.searchParams.get("departmentId")) {
          const users = await prisma.staff.findMany({
            where: {
              departmentId: request.nextUrl.searchParams.get("departmentId"),
            },
          });
          return NextResponse.json({ message: users }, { status: 200 });
        }
        const users = await prisma.staff.findMany({
          where: {
            departmentId: null,
          },
        });
        return NextResponse.json({ message: users }, { status: 200 });
      } else if (url == "students") {
        const users = await prisma.student.findMany({
          include: {
            class: {
              select: {
                id: true,
                department: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
          orderBy: {
            register_number: "asc",
          },
          where: {
            class: {
              archived: false,
            },
          },
        });
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
  let user: any;
  try {
    const userdata = await request.json();
    let action: boolean = false;
    const token = await getToken({
      req: request,
      secret: process.env.JWT_SECRET,
    });
    if (token.role == "admin") {
      for (user of userdata) {
        if (user.role == "staff") {
          if (user.email && user.password) {
            const duplicate = await prisma.staff.findUnique({
              where: { email: user.email },
            });
            if (!duplicate) {
              const hashedPassword = await bcrypt.hash(user.password, 10);
              user.password = hashedPassword;
              //create user
              const createdUser = await prisma.staff.create({
                data: user,
              });
              if (createdUser) {
                action = true;
              }
            }
          }
        } else if (user.role == "student") {
          if (user.email && user.password) {
            const duplicate = await prisma.student.findUnique({
              where: { email: user.email },
            });
            if (!duplicate) {
              const hashedPassword = await bcrypt.hash(user.password, 10);
              user.password = hashedPassword;
              console.log("the user is ", user);
              //create user
              const createdUser = await prisma.student.create({
                data: user,
              });
              if (createdUser) {
                action = true;
              }
            }
          }
        }
      }
      if (action) {
        return NextResponse.json({ message: "Login created" }, { status: 201 });
      }
    } else {
      return NextResponse.json({ message: "Unauthorized" }, { status: 402 });
    }
  } catch (err) {
    return NextResponse.json(
      { message: "Error catch block", error: err.toString(), data: user },
      { status: 500 }
    );
  }
}

// //check if data exists
// if (!userdata.email || !userdata.password) {
//   return NextResponse.json(
//     { message: "Please enter all fields" },
//     { status: 400 }
//   );
// }
// if (request.nextUrl.searchParams.get("role") == "staff") {
//   //check if user exists
//   const duplicate = await prisma.staff.findUnique({
//     where: { email: userdata.email },
//   });
//   if (duplicate) {
//     return NextResponse.json(
//       { message: "User already" },
//       { status: 409 }
//     );
//   }
//   //hash password
//   const hashedPassword = await bcrypt.hash(userdata.password, 10);
//   userdata.password = hashedPassword;
//   //create user
//   const user = await prisma.staff.create({
//     data: userdata,
//   });
//   console.log("the user created", user.email);
//   return NextResponse.json({ message: "user created" }, { status: 201 });
// } else if (request.nextUrl.searchParams.get("role") == "student") {
//   //check if user exists
//   const duplicate = await prisma.student.findUnique({
//     where: { email: userdata.email },
//   });
//   if (duplicate) {
//     return NextResponse.json(
//       { message: "User already" },
//       { status: 409 }
//     );
//   }
//   //hash password
//   const hashedPassword = await bcrypt.hash(userdata.password, 10);
//   userdata.password = hashedPassword;
//   //create user
//   const user = await prisma.student.create({
//     data: userdata,
//   });
//   console.log("the user created", user.email);
//   return NextResponse.json({ message: "user created" }, { status: 201 });
// }
