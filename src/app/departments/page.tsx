"use client";

import React, { useEffect, useState } from "react";
import { getDepartments,addDepartment } from "../../lib/services/departments/service";
import {
  Card,
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


export default function Departments() {
  const [data, setData] = useState("");
  const [dept, setDept] = useState<any>(null);
  const getDepartmentList = async () => {
    try{
      const res = await getDepartments();
      if(res){
        setDept(res);
      }
    }
    catch(err){
      console.log(err);
    }
  }
  const addDepartmentName = async (name: string) => {
    try{
      console.log(name);
      const res = await addDepartment(name);
      if(res){
        getDepartmentList();
      }
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    getDepartmentList();
  }
  , [dept]);
  

  function handleChange(event) {
    setData(event.target.value);
  }

  async function handleClick(event) {
    if (data !== "") {
      addDepartmentName(data);
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
      <div className="flex">
        {dept?.map((depts, i) => (
          <Card className="hover:bg-slate-500 ml-6" key={i}>
            <CardHeader>
              <CardTitle className="text-balance">{depts.name}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
