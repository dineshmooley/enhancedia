"use client";

import * as React from "react";
import { Button } from "../(components)/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "../(components)/ui/table";
import { Plus } from "lucide-react";
const data = [
  {
    slNo: 1,
    regNo: 311120205024,
    name: "Dinesh Kumar",
    email: "dineshkumar.24it@licet.ac.in",
  },
  {
    slNo: 2,
    regNo: 311120205014,
    name: "Ashik S",
    email: "ashik.24it@licet.ac.in",
  },
  {
    slNo: 3,
    regNo: 311120205049,
    name: "Samsson R",
    email: "samsson.24it@licet.ac.in",
  },
  {
    slNo: 4,
    regNo: 311120205006,
    name: "Alwin Jebastine",
    email: "alwinjebastine.24it@licet.ac.in",
  },
];

export default function Students() {
  return (
    <div className="w-full container">
      <div className="flex my-16 justify-between">
        <h1 className="text-5xl">Students</h1>
        <Button variant="outline" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Sl. No.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Register No.</TableHead>
            <TableHead>Email ID</TableHead>
          </TableRow>
        </TableHeader>

        {data.map((entry) => {
          return (
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">{entry.slNo}</TableCell>
                <TableCell>{entry.regNo}</TableCell>
                <TableCell>{entry.name}</TableCell>
                <TableCell>{entry.email}</TableCell>
              </TableRow>
            </TableBody>
          );
        })}
      </Table>
    </div>
  );
}
