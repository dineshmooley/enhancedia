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
    q: "I'd rather spend a free evening",
    a: "reading or working alone on a project",
    b: "working on a task with friends",
  },
  {
    qno: 2,
    q: "Peoples form opinions about me so quickly",
    a: "Hardly ever",
    b: "Often",
  },
  {
    qno: 3,
    q: "If there is a chore to do, I'm more likely to",
    a: "put it off until it needs to be done",
    b: "get started on it right away",
  },
  {
    qno: 4,
    q: "I prefer to eat lunch",
    a: "with a group of people",
    b: "by myself",
  },
  {
    qno: 5,
    q: "I am patient with people, even when they aren't polite and considerate of my feelings",
    a: "true",
    b: "false",
  },
  {
    qno: 6,
    q: "I prefer reading rough and realistic action stories more than sensitive, imaginative novels",
    a: "true",
    b: "false",
  },
  {
    qno: 7,
    q: "In school I preferred (or prefer) math more than English",
    a: "true",
    b: "false",
  },
  {
    qno: 8,
    q: "More trouble arises from people",
    a: "questioning and changing methods that are already satisfactory",
    b: "turning down promising, new approaches",
  },
  {
    qno: 9,
    q: "In building or making something, I would rather work",
    a: "with others",
    b: "on my own",
  },
  {
    qno: 10,
    q: " I've trained myself to be patient with all kinds of people",
    a: "true",
    b: "false",
  },
];

const Tests = () => {
  return (
    <div className="container">
      <div className="flex justify-center items-center my-2 flex-col">
        {QA.map((qa) => {
          return <TestCards qno={qa.qno} qn={qa.q} opta={qa.a} optb={qa.b} />;
        })}
      </div>
      <div className="flex justify-center items-center mt-2">
        <Button>Submit</Button>
      </div>
    </div>
  );
};

type testCardProps = {
  qno: number;
  qn: string;
  opta: string;
  optb: string;
};

function TestCards({ qno, qn, opta, optb }: testCardProps) {
  return (
    <Card className=" col-4 w-[350px] my-4" key={qno}>
      <CardHeader>
        <CardTitle>Question {qno}</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">{qn}</Label>
              <Select>
                <SelectTrigger id="name">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="1">{opta}</SelectItem>
                  <SelectItem value="2">{optb}</SelectItem>
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
}

export default Tests;
