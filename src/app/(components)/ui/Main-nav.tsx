import Link from "next/link";
import { RouterPath } from "../../../lib/RouterConst";
import { cn } from "../../../lib/utils";
import { Button } from "./button";
import { signOut } from "next-auth/react";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href={RouterPath.Home}
        className="text-md font-medium transition-colors hover:text-primary"
      >
        Home
      </Link>
      <Link
        href={RouterPath.Tests}
        className="text-md font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Test
      </Link>
      <Link
        href={RouterPath.Departments}
        className="text-md font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Departments
      </Link>
      <Link
        href={RouterPath.Students}
        className="text-md font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Students
      </Link>
    </nav>
  );
}
