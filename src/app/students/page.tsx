"use client";
import { useEffect, useState } from "react";
import papa from "papaparse";
import { columns } from "../(components)/ui/data-table/columns";
import { DataTable } from "../(components)/ui/data-table/Data-Table";
import { Card } from "../(components)/ui/card";
import { data as utilsData } from "../../lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../(components)/ui/dropdown-menu";
import { Button } from "../(components)/ui/button";
import { Label } from "../(components)/ui/label";
import { Input } from "../(components)/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../(components)/ui/dialog";
import {
  getDepartments,
  getDepartmentById,
} from "../../lib/services/departments/service";
import { SignUp } from "../../lib/services/auth/service";
import { getStudents } from "../../lib/services/users/service";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "../(components)/ui/select";

const Students = () => {
  const [DialogDetails, setDialogDetails] = useState<any>(null);
  const [data, setData] = useState<any>(null);
  const [departments, setDepartments] = useState<any>(null);
  const [classes, setClasses] = useState<any>(null);
  const [selectData, setSelectData] = useState<any>(null);
  const [students, setStudents] = useState<any>(null);

  const getStudentList = async () => {
    try {
      const res = await getStudents();
      if (res !== undefined && res !== null) {
        setStudents(res);
        console.log("The students are ", res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getDepartmentList = async () => {
    try {
      const res = await getDepartments();
      if (res) {
        console.log("The departments are ", res);
        setDepartments(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getClasses = async (id: string) => {
    try {
      const res = await getDepartmentById(id);
      if (res) {
        setClasses(res.classes);
        console.log("The classes are ", res.classes);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const StudentUpload = async (data: any) => {
    try {
      const res = await SignUp(data);
      if (res) {
        console.log("The result is ", res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStudentList();
    getDepartmentList();
  }, []);

  if (!students) return <div>Loading...</div>;

  return (
    <Dialog>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{DialogDetails?.title}</DialogTitle>
          <DialogDescription>{DialogDetails?.description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {DialogDetails?.work == "add" ? (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Register Number
                </Label>
                <Input className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Email
                </Label>
                <Input className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Password
                </Label>
                <Input className="col-span-3" />
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Department
                </Label>
                <Select
                  onValueChange={(value) => {
                    setSelectData({ departmentId: value });
                    getClasses(value);
                  }}
                >
                  <SelectTrigger className="w-[275px]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select Department</SelectLabel>
                      {departments &&
                        departments?.map((department: any) => (
                          <SelectItem key={department.id} value={department.id}>
                            {department.name}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Class
                </Label>
                <Select
                  onValueChange={(value) => {
                    setSelectData({ ...selectData, ClassId: value });
                  }}
                >
                  <SelectTrigger className="w-[275px]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select Class</SelectLabel>
                      {classes?.map((item: any) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.batch}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              {selectData?.ClassId && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    className="col-span-3"
                    type="file"
                    accept=".csv"
                    onChange={(e) => {
                      papa.parse(e.target.files![0], {
                        header: true,
                        complete(results) {
                          results.data.map((item: any) => {
                            const element = item;
                            delete element.sno;
                            element.register_number = element?.reg_no.trim();
                            delete element.reg_no;
                            element.name = element?.name.trim();
                            element.email = element?.email.trim();
                            element.password = element?.password.trim();
                            element.role = "student".trim();
                            element.classId = selectData?.ClassId.trim();
                          });
                          setData(results.data);
                        },
                      });
                    }}
                  />
                </div>
              )}
            </>
          )}
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
                StudentUpload(data);
              }}
            >
              {DialogDetails?.work}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
      <div className="container mt-5">
        <Card className=" dark:bg-slate-900 shadow-md">
          <div className="">
            <div className="flex p-4 justify-between items-center">
              <h2 className="text-3xl font-bold tracking-tight me-4 align-middle">
                Students
              </h2>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="font-semibold gap-1">
                    <span className="sr-only">Open menu</span>
                    More Options
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DialogTrigger
                    onClick={() => {
                      setDialogDetails({
                        title: "Add Staff",
                        description: "Upload the .csv File",
                        work: "Bulk add",
                      });
                      getDepartmentList();
                    }}
                    asChild
                  >
                    <DropdownMenuItem>Bulk Upload</DropdownMenuItem>
                  </DialogTrigger>
                  <DropdownMenuSeparator />
                  <DialogTrigger
                    onClick={() => {
                      setDialogDetails({
                        title: "Add Staff",
                        description: "Enter the details",
                        work: "add",
                      });
                    }}
                    asChild
                  >
                    <DropdownMenuItem>Single Upload</DropdownMenuItem>
                  </DialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </Card>
        <Card className="mt-5 p-5">
          <DataTable columns={columns} data={students.message} />
        </Card>
      </div>
    </Dialog>
  );
};

export default Students;
