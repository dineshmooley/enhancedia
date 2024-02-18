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
  const [formdata, setFormdata] = useState({ email: null, password: null });
  const [ErrorMessage, setErrorMessage] = useState(null);
  const router = useRouter();

  async function onSubmit(event: React.SyntheticEvent) {
    setIsLoading(true);
    try {
      console.log("the user email is ", formdata.email, " ", formdata.password);
      event.preventDefault();
      const res = await signIn("credentials", {
        useremail: formdata.email,
        password: formdata.password,
        redirect: false,
      });
      if (res.error) {
        setErrorMessage(res.error);
      }
      router.refresh();
      router.push("/");
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
                  setFormdata({ ...formdata, email: e.target.value });
                }}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                onChange={(e) => {
                  setFormdata({ ...formdata, password: e.target.value });
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
