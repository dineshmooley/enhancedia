import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   redirect("/login");
  // }
  return (
    <>
      <main
        className={`flex min-h-screen flex-col items-center justify-between ${inter.className}`}
      >
        <p className="uppercase">hello</p>
      </main>
    </>
  );
}
