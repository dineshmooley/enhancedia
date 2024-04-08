"use client";

import Link from "next/link";
import { MainNav } from "./ui/Main-nav";
import { ModeToggle } from "./ui/mode-toggle";
import { UserDrop } from "./ui/user-drop";
import { usePathname } from "next/navigation";
import { RouterPath } from "../../lib/RouterConst";

const Header = () => {
  const pathname = usePathname();
  if (pathname != RouterPath.login) {
    return (
      <>
        <div className="hidden flex-col md:flex">
          <div className="border-b">
            <div className="flex p-4 justify-between">
              <Link href="/" className="mt-2">
                LICET
              </Link>
              <MainNav className="mx-6" />
              <div className="flex items-center">
                <ModeToggle />
                <UserDrop className="ml-4" />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Header;
