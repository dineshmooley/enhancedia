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
      className={cn("flex items-center space-x-2 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href={RouterPath.Home}
        className="text-md font-medium transition-colors hover:text-primary"
      >
        <Button variant="ghost">Home</Button>
      </Link>
      <Link
        href={RouterPath.Questions}
        className="text-md font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <Button variant="ghost">QA</Button>
      </Link>
      <Link
        href={RouterPath.Departments}
        className="text-md font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <Button variant="ghost">Departments</Button>
      </Link>
      <Link
        href={RouterPath.Students}
        className="text-md font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <Button variant="ghost">Students</Button>
      </Link>
      <Link
        href={RouterPath.staffs}
        className="text-md font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <Button variant="ghost">Staffs</Button>
      </Link>
    </nav>
  );
}
