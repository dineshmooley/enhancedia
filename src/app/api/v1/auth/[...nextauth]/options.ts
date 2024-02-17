import CredentialsProvider from "next-auth/providers/credentials";

export const Options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        useremail: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials:
          | Record<"username" | "useremail" | "password", string>
          | undefined
      ): Promise<any> {
        try {
          console.log("hello world");
        } catch (e) {
          console.log(e);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
};
