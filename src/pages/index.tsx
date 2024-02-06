import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { MainNav } from "@/components/ui/Main-nav";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <main
        className={`flex min-h-screen flex-col items-center justify-between ${inter.className}`}
      >
        hello
      </main>
    </>
  );
}
