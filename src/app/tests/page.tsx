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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../(components)/ui/select";
import { Button } from "../(components)/ui/button";

const QA = [
  {
    qno: 1,
    qdif: "Easy",
    q: "Who is the father of computer ?",
    a: "Steve Jobs",
    b: "Bill Gates",
    c: "Charles Babbage",
    d: "Crispin",
  },
  {
    qno: 2,
    qdif: "Moderate",
    q: "Who is the father of computer ?",
    a: "Steve Jobs",
    b: "Bill Gates",
    c: "Charles Babbage",
    d: "Crispin",
  },
  {
    qno: 3,
    qdif: "Easy",
    q: "Who is the father of computer ?",
    a: "Steve Jobs",
    b: "Bill Gates",
    c: "Charles Babbage",
    d: "Crispin",
  },
  {
    qno: 4,
    qdif: "Easy",
    q: "Who is the father of computer ?",
    a: "Steve Jobs",
    b: "Bill Gates",
    c: "Charles Babbage",
    d: "Crispin",
  },
  {
    qno: 5,
    qdif: "Easy",
    q: "Who is the father of computer ?",
    a: "Steve Jobs",
    b: "Bill Gates",
    c: "Charles Babbage",
    d: "Crispin",
  },
];

const Tests = () => {
  return (
    <div className="container">
      <div className="row justify-content-center align-items-start">
        {QA.map((qa) => {
          return (
            <Card className=" col-4 w-[350px] mt-8" key={qa.qno}>
              <CardHeader>
                <CardTitle>Question {qa.qno}</CardTitle>
                <CardDescription>{qa.qdif}</CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">{qa.q}</Label>
                      <Select>
                        <SelectTrigger id="name">
                          <SelectValue placeholder="Dinesh" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectItem value="1">{qa.a}</SelectItem>
                          <SelectItem value="2">{qa.b}</SelectItem>
                          <SelectItem value="3">{qa.c}</SelectItem>
                          <SelectItem value="4">{qa.d}</SelectItem>
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
          );
        })}
      </div>
      <div className="flex justify-center items-center mt-2">
        <Button>Submit</Button>
      </div>
    </div>
  );
};

export default Tests;
