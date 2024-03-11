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
  DialogClose,
} from "../(components)/ui/dialog";
import { Input } from "../(components)/ui/input";
import { Label } from "../(components)/ui/label";
import { Plus } from "lucide-react";
import { Button } from "../(components)/ui/button";
import { useState } from "react";

const Departments = () => {
  const [data, setData] = useState("");
  const [dept, setDept] = useState([
    "Information Technology",
    "Computer Science Engineering",
    "Electrical and Electronics Engineering",
    "Electronics and Communication Engineering",
    "Mechanical Engineering",
  ]);

  function handleChange(event) {
    setData(event.target.value);
  }

  function handleClick(event) {
    if (data !== "") {
      setDept([...dept, data]);
      setData("");
    }
  }

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
                  <Input
                    value={data}
                    onChange={handleChange}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="ghost">
                    Cancel
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    type="submit"
                    variant="secondary"
                    onClick={handleClick}
                  >
                    Create
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="flex flex-wrap">
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
