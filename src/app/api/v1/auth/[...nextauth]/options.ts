// import CredentialsProvider from "next-auth/providers/credentials";
// import prisma from "../../../../../../prisma/Prisma";
// import bcrypt from "bcrypt";
// import { User } from "next-auth";

// export const Options = {
//   pages: {
//     signIn: "/login",
//   },
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         useremail: { label: "useremail", type: "email" },
//         password: { label: "password", type: "password" },
//       },
//       async authorize(credentials) {
//         try {
//           console.log("the credits are", credentials);
//           const founduser = await prisma.staff.findUnique({
//             where: { email: credentials.useremail }, // Fix: Use 'where' instead of 'email'
//           });
//           if (founduser) {
//             const isMatch = await bcrypt.compare(
//               credentials.password,
//               founduser.password
//             );
//             if (isMatch) {
//               delete founduser.password;
//               return founduser;
//             }
//           }
//         } catch (e) {
//           console.log(e);
//         }
//         return null;
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }: { token: any; user: any }) {
//       if (user) token.role = user.role;
//       return token;
//     },
//     async session({ session, token }: { session: any; token: any }) {
//       if (session?.user) session.user.role = token.role;
//       return session;
//     },
//   },
// };
