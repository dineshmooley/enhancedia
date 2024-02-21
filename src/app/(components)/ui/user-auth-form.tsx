"use client";

import * as React from "react";
import { useState } from "react";

import { cn } from "../../../lib/utils";
//import { Icons } from "@/components/ui/icons"
import { Loader2 } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [ErrorMessage, setErrorMessage] = useState(null);
  const router = useRouter();

  async function onSubmit(event: React.SyntheticEvent) {
    setIsLoading(true);
    try {
      console.log(
        "the user email is ",
        credentials.email,
        " ",
        credentials.password
      );
      event.preventDefault();
      const res = await signIn("credentials", {
        ...credentials,
        redirect: true,
        callbackUrl: "/",
      });
      if (res.error) {
        setErrorMessage(res.error);
      } else {
        router.push("/");
      }
    } catch (e) {
      setErrorMessage("Invalid Credentials");
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-red-500">{ErrorMessage}</div>
            <div className="space-y-1">
              <Label htmlFor="name">Licet Email</Label>
              <Input
                id="name"
                type="email"
                onChange={(e) => {
                  setCredentials({ ...credentials, email: e.target.value });
                }}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                onChange={(e) => {
                  setCredentials({ ...credentials, password: e.target.value });
                }}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button disabled={isLoading}>
              {isLoading && <Loader2 />}
              Sign In
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
