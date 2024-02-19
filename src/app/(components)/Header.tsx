"use client";

import Link from "next/link";
import { MainNav } from "./ui/Main-nav";
import { ModeToggle } from "./ui/mode-toggle";

const Header = () => {
  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex p-4 justify-between">
            <Link href="/" className="mt-2">
              LICET
            </Link>
            <MainNav className="mx-6" />
            <ModeToggle />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;