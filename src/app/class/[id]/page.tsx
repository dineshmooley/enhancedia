"use client";
import { useState, useEffect } from "react";
import { Payment, columns } from "../../(components)/ui/data-table/columns";
import { DataTable } from "../../(components)/ui/data-table/Data-Table";
import { Card } from "../../(components)/ui/card";
import { data as utilsData } from "../../../lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../../(components)/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../(components)/ui/tabs";
import { Button } from "../../(components)/ui/button";
import { Dialog, DialogTrigger } from "../../(components)/ui/dialog";
import { Separator } from "../../(components)/ui/separator";
import { getClass } from "../../../lib/services/class/service";

export default function Departments({ params }: { params: { id: string } }) {
  const [dialogDetails, setDialogDetails] = useState({
    title: "",
    description: "",
    action: "",
  });
  const id = params.id;
  const [Classdata, setClassData] = useState(null);

  const GetClass = async () => {
    try {
      const res = await getClass(id);
      if (res) {
        console.log("the class ", res);
        setClassData(res);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    GetClass();
  }, []);

  if (!Classdata) return <div>Loading...</div>;

  return (
    <>
      <Dialog>
        <div className="container mt-5">
          <Card className=" dark:bg-slate-900 shadow-md">
            <div className="">
              <div className="flex p-4 justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight me-4 align-middle">
                  Class Overview
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
                      asChild
                      onClick={() =>
                        setDialogDetails({
                          title: "Edit Class",
                          description: "Enter the details to edit the class!.",
                          action: "Edit !",
                        })
                      }
                    >
                      <DropdownMenuItem>Edit Class</DropdownMenuItem>
                    </DialogTrigger>

                    <DropdownMenuSeparator />
                    <DialogTrigger
                      asChild
                      onClick={() => {
                        setDialogDetails({
                          title: "Add Advisors",
                          description:
                            "Enter the details to add advisors to the class!.",
                          action: "Add",
                        });
                      }}
                    >
                      <DropdownMenuItem>Add Advisors</DropdownMenuItem>
                    </DialogTrigger>

                    <DropdownMenuSeparator />

                    <DialogTrigger
                      asChild
                      onClick={() => {
                        setDialogDetails({
                          title: "Remove Advisors",
                          description:
                            "Enter the details to remove advisors from the class!.",
                          action: "Remove",
                        });
                      }}
                    >
                      <DropdownMenuItem>Remove Advisors</DropdownMenuItem>
                    </DialogTrigger>

                    <DropdownMenuSeparator />

                    <Button className="bg-red-800 text-white">
                      Delete Class
                    </Button>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Separator />
              <div className="flex p-2 max-md:flex-col max-md:divide-y md:flex-row md:divide-x ">
                <div className="flex flex-col gap-1 my-2 px-2">
                  <h5 className="text-xs text-muted-foreground">Department</h5>

                  <span className="font-semibold">
                    {Classdata?.department.name}
                  </span>
                </div>
                <div className="flex flex-col gap-1 my-2 px-4">
                  <h5 className="text-xs text-muted-foreground">Batch</h5>
                  <span className="font-semibold">{Classdata?.batch}</span>
                </div>
                <div className="flex flex-col gap-1 my-2 px-2">
                  <h5 className="text-xs text-muted-foreground">Section</h5>
                  <span className="font-semibold">{Classdata?.section}</span>
                </div>
              </div>
            </div>
          </Card>
          <Tabs defaultValue="student" className="mt-5">
            <TabsList className="grid w-1/4 grid-cols-2">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="test">Test</TabsTrigger>
            </TabsList>
            <TabsContent value="student">
              <Card className="p-5">
                <DataTable columns={columns} data={Classdata.students} />
              </Card>
            </TabsContent>
            <TabsContent value="test">
              <Card className="p-5">Test</Card>
            </TabsContent>
          </Tabs>
        </div>
      </Dialog>
    </>
  );
}
