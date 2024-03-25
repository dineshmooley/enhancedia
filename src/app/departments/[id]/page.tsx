"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../../(components)/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../(components)/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "../../(components)/ui/button";
import { Input } from "../../(components)/ui/input";
import { Label } from "../../(components)/ui/label";
import { Card, CardHeader, CardTitle } from "../../(components)/ui/card";
import Link from "next/link";
import {
  getDepartmentById,
  addClass,
  deleteDepartment,
  editDepartment,
} from "../../../lib/services/departments/service";

export default function Department({ params }: { params: { id: string } }) {
  const [data, setData] = useState<any>({ departmentId: params.id });
  const [classes, setClasses] = useState<any>(null);
  const [dialogData, setDialogData] = useState<any>({
    title: "",
    description: "",
    work: "",
  });
  const id = params.id;
  const router = useRouter();

  const getClassesList = async () => {
    try {
      const res = await getDepartmentById(id);
      if (res) {
        console.log(res);
        setClasses(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const CreateClass = async (data: any) => {
    try {
      console.log("the data is ", data);
      const res = await addClass(data);
      if (res) {
        getClassesList();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const EditDepartment = async (id: string, data: any) => {
    try {
      const res = await editDepartment(id, data);
      if (res) {
        getClassesList();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteDept = async (id: string) => {
    try {
      const res = await deleteDepartment(id);
      if (res) {
        router.push("/departments");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getClassesList();
    setDialogData({
      title: "",
      description: "",
      work: "",
    });
  }, []);

  return (
    <div className="container">
      <Dialog>
        <div className="flex my-16 justify-between">
          <div className="flex">
            <h1 className="text-5xl">{classes?.name}</h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">...</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DialogTrigger
                  asChild
                  onClick={() => {
                    setDialogData({
                      title: "Edit Department",
                      description: "Edit the details",
                      work: "edit",
                    });
                  }}
                >
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                </DialogTrigger>
                <DialogTrigger
                  asChild
                  onClick={() => {
                    setDialogData({
                      title: "Delete Department",
                      description: "Delete the department",
                      work: "delete",
                    });
                  }}
                >
                  <DropdownMenuItem className="my-2 bg-destructive">
                    Delete
                  </DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div>
            <DialogTrigger
              asChild
              onClick={() => {
                setDialogData({
                  title: "Add class",
                  description: "Enter details",
                  work: "add",
                });
              }}
            >
              <Button variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{dialogData.title}</DialogTitle>
                <DialogDescription>{dialogData.description}</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {dialogData.work == "add" ? (
                  <>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Regulation
                      </Label>
                      <Input
                        type="number"
                        onChange={(e) => {
                          setData({
                            ...data,
                            regulation: parseInt(e.target.value),
                          });
                        }}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Batch
                      </Label>
                      <Input
                        type="number"
                        onChange={(e) => {
                          setData({ ...data, batch: parseInt(e.target.value) });
                        }}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Section
                      </Label>
                      <Input
                        type="text"
                        onChange={(e) => {
                          setData({ ...data, section: e.target.value });
                        }}
                        className="col-span-3"
                      />
                    </div>
                  </>
                ) : dialogData.work == "edit" ? (
                  <>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        type="text"
                        placeholder={classes.name}
                        onChange={(e) => {
                          setData({
                            name: e.target.value,
                          });
                        }}
                        className="col-span-3"
                      />
                    </div>
                  </>
                ) : dialogData.work == "delete" ? (
                  <>
                    <div className="">
                      <Label htmlFor="name" className="text-right">
                        Are you sure want to delete it?
                      </Label>
                    </div>
                  </>
                ) : null}
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
                    onClick={() => {
                      dialogData.work == "add"
                        ? CreateClass(data)
                        : dialogData.work == "edit"
                        ? EditDepartment(id, data)
                        : dialogData.work == "delete"
                        ? deleteDept(id)
                        : null;
                    }}
                  >
                    {dialogData.work}
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </div>
        </div>
        <div className="flex">
          {classes?.classes?.map((depts, i) => (
            <Link href={`/class/${depts.id}`} key={i}>
              <Card className="ml-6">
                <CardHeader>
                  <CardTitle className="text-balance">{depts?.batch}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </Dialog>
    </div>
  );
}
