import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "../../../../../prisma/Prisma";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        queryrole: { label: "QueryRole", type: "string" },
      },
      authorize: async (credentials) => {
        const useremail = credentials.email;
        const password = credentials.password;
        const role = credentials.queryrole;
        if (!useremail || !password) {
          return null;
        }

        if (role == "staff") {
          const user = await prisma.staff.findUnique({
            where: {
              email: useremail,
            },
          });
          if (user && (await bcrypt.compare(password, user.password))) {
            return user;
          }
        } else if (role == "student") {
          const user = await prisma.student.findUnique({
            where: {
              email: useremail,
            },
          });
          if (user && (await bcrypt.compare(password, user.password))) {
            return user;
          }
        }
        throw new Error("invalid credentials provided");
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: any }) {
      if (user) {
        token.role = user.role;
        if (token.role == "student") token.classId = user.classId;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any; user: any }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
