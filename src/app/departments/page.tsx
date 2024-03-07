"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../(components)/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../(components)/ui/dialog";
import { Input } from "../(components)/ui/input";
import { Label } from "../(components)/ui/label";
import { Plus } from "lucide-react";
import { Button } from "../(components)/ui/button";

const Departments = () => {
  const dept = [
    "Information Technology",
    "Computer Science Engineering",
    "Electrical and Electronics Engineering",
    "Electronics and Communication Engineering",
    "Mechanical Engineering",
  ];
  return (
    <div className="container">
      <div className="flex my-16 justify-between">
        <h1 className="text-5xl">Departments</h1>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Departments</DialogTitle>
                <DialogDescription>
                  Enter title of the Department
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="flex">
        {dept.map((depts, i) => (
          <Card className="hover:bg-slate-500 ml-6" key={i}>
            <CardHeader>
              <CardTitle>{depts}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Departments;
