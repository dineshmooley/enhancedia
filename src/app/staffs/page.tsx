"use client";
import { Payment, columns } from "../(components)/ui/data-table/columns";
import { DataTable } from "../(components)/ui/data-table/Data-Table";
import { Card } from "../(components)/ui/card";
import { data } from "../../lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../(components)/ui/dropdown-menu";
import { Button } from "../(components)/ui/button";
import { Dialog, DialogTrigger } from "../(components)/ui/dialog";

export default function Staffs() {
  return (
    <Dialog>
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
                  <DialogTrigger asChild>
                    <DropdownMenuItem>Bulk Upload</DropdownMenuItem>
                  </DialogTrigger>
                  <DropdownMenuSeparator />
                  <DialogTrigger asChild>
                    <DropdownMenuItem>Single Upload</DropdownMenuItem>
                  </DialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </Card>
        <Card className="mt-5 p-5">
          <DataTable columns={columns} data={data} />
        </Card>
      </div>
    </Dialog>
  );
}
