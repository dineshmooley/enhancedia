"use client";
import { useEffect, useState } from "react";
import papa from "papaparse";
import { columns2 } from "../(components)/ui/data-table/columns";
import { DataTable } from "../(components)/ui/data-table/Data-Table";
import { Card } from "../(components)/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../(components)/ui/dropdown-menu";
import { Button } from "../(components)/ui/button";
import { Dialog, DialogTrigger } from "../(components)/ui/dialog";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../(components)/ui/dialog";
import { Input } from "../(components)/ui/input";
import { Label } from "../(components)/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../(components)/ui/select";
import { getDepartments } from "../../lib/services/departments/service";
import { SignUp } from "../../lib/services/auth/service";
import { DownloadIcon } from "@radix-ui/react-icons";

export default function Staffs() {
  const [DialogDetails, setDialogDetails] = useState(null);
  const [departments, setDepartments] = useState(null);
  const [selectData, setSelectData] = useState(null);
  const [data, setData] = useState(null);

  const getDepartmentList = async () => {
    try {
      const response = await getDepartments();
      setDepartments(response);
    } catch (error) {
      console.log(error);
    }
  };

  const StaffUpload = async (data: any[]) => {
    try {
      const response = await SignUp(data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDepartmentList();
  }, []);

  return (
    <Dialog>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{DialogDetails?.title}</DialogTitle>
          <DialogDescription>{DialogDetails?.description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {DialogDetails?.work === "Add" ? (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Roll Number
                </Label>
                <Input
                  className="col-span-3"
                  onChange={(e) => {
                    data[0].roll_no = e.target.value;
                  }}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Department
                </Label>
                <Select
                  onValueChange={(e) => {
                    data[0].departmentId = e;
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
                  Name
                </Label>
                <Input
                  className="col-span-3"
                  onChange={(e) => {
                    data[0].name = e.target.value;
                  }}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Email
                </Label>
                <Input
                  className="col-span-3"
                  onChange={(e) => {
                    data[0].email = e.target.value;
                  }}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Password
                </Label>
                <Input
                  className="col-span-3"
                  onChange={(e) => {
                    data[0].password = e.target.value;
                  }}
                />
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
                  File
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
                          element.roll_no = element?.roll_no.trim();
                          element.name = element?.name.trim();
                          element.email = element?.email.trim();
                          element.password = element?.password.trim();
                          element.role = "staff".trim();
                          element.departmentId =
                            selectData?.departmentId.trim();
                        });
                        setData(results.data);
                      },
                    });
                  }}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Sample CSV
                </Label>
                <a className="text-sm" href="/template/staff_db.csv" download>
                  <Button size="sm" variant="outline" className="">
                    <DownloadIcon className="mx-2 my-2 h-4 w-4" />
                    Download
                  </Button>
                </a>
              </div>
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
            <Button type="submit" onClick={() => StaffUpload(data)}>
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
                Staffs
              </h2>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="font-semibold gap-1">
                    <span className="sr-only">Open menu</span>
                    More Options
                    {/* <MoreVertical className="h-4 w-4" /> */}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DialogTrigger
                    onClick={() => {
                      setDialogDetails({
                        title: "Add Staffs",
                        description: "upload the csv file",
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
                        description: "Enter the Details",
                        work: "Add",
                      });
                      setData([
                        {
                          roll_no: "",
                          name: "",
                          email: "",
                          password: "",
                          departmentId: "",
                          role: "staff",
                        },
                      ]);
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
          <DataTable columns={columns2} data={null} />
        </Card>
      </div>
    </Dialog>
  );
}
