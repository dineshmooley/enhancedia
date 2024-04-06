"use client";
import { useState } from "react";
import { Payment, columns } from "../(components)/ui/data-table/columns";
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

const Staffs = () => {
  const [DialogDetails, setDialogDetails] = useState<any>(null);
  return (
    <Dialog>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{DialogDetails?.title}</DialogTitle>
          <DialogDescription>{DialogDetails?.description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit">{DialogDetails?.work}</Button>
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
          <DataTable columns={columns} data={utilsData} />
        </Card>
      </div>
    </Dialog>
  );
};

export default Staffs;
