"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../(components)/ui/card";
import { Label } from "../(components)/ui/label";
import { Input } from "../(components)/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../(components)/ui/select";
import { Button } from "../(components)/ui/button";

const Tests = () => {
  return (
    <>
      <div className="flex justify-center items-center mt-8">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Question 1</CardTitle>
            <CardDescription>Hard</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Who is the best Developer ?</Label>
                  <Select>
                    <SelectTrigger id="name">
                      <SelectValue placeholder="Dinesh" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="1">Dinesh</SelectItem>
                      <SelectItem value="2">Dinesh</SelectItem>
                      <SelectItem value="3">Dinesh</SelectItem>
                      <SelectItem value="4">Dinesh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Reset</Button>
          </CardFooter>
        </Card>
      </div>
      <div className="flex justify-center items-center mt-2">
        <Button>Submit</Button>
      </div>
    </>
  );
};

export default Tests;
