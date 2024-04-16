"use client";
import { useState, useEffect } from "react";
import { columns } from "../../(components)/ui/data-table/columns";
import { DataTable } from "../../(components)/ui/data-table/Data-Table";
import { Card } from "../../(components)/ui/card";
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
import { Label } from "../../(components)/ui/label";
import { Input } from "../../(components)/ui/input";
import { Button } from "../../(components)/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "../../(components)/ui/dialog";
import { Separator } from "../../(components)/ui/separator";
import { getClass } from "../../../lib/services/class/service";
import { PlusIcon } from "lucide-react";
import { CreateTestService } from "../../../lib/services/tests/service";
import { toast } from "sonner";
import Link from "next/link";

export default function Departments({ params }: { params: { id: string } }) {
  const [dialogDetails, setDialogDetails] = useState({
    title: "",
    description: "",
    action: "",
  });
  const id = params.id;
  const [Classdata, setClassData] = useState(null);
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);

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

  const CreateTest = async (data: any) => {
    try {
      const res = await CreateTestService(data);
      if (res.message === "success") {
        setOpen(false);
        toast.success("Test Created Successfully");
        GetClass();
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
              <Card className="p-5">
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setData(null);
                        setData({ classId: id });
                      }}
                    >
                      <PlusIcon />
                      Add Test
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Create Test</DialogTitle>
                      <DialogDescription>Enter Details</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Title
                        </Label>
                        <Input
                          onChange={(e) => {
                            setData({ ...data, name: e.target.value });
                          }}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Description
                        </Label>
                        <Input
                          onChange={(e) => {
                            setData({ ...data, description: e.target.value });
                          }}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Start Time
                        </Label>
                        <Input
                          onChange={(e) => {
                            const val = new Date(e.target.value).toISOString();
                            setData({ ...data, start_time: val });
                          }}
                          className="col-span-3"
                          type="datetime-local"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          End Time
                        </Label>
                        <Input
                          onChange={(e) => {
                            const val = new Date(e.target.value).toISOString();
                            setData({ ...data, end_time: val });
                          }}
                          className="col-span-3"
                          type="datetime-local"
                        />
                      </div>
                      <div className="grid mt-3 items-center gap-4">
                        <Label htmlFor="name" className="font-semibold">
                          Note: Add Questions after Creation
                        </Label>
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
                          onClick={() => {
                            CreateTest(data);
                          }}
                        >
                          Create
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                {Classdata?.tests.length > 0
                  ? Classdata?.tests.map((test: any) => (
                      <Card
                        key={test.id}
                        className="flex justify-between items-center p-2 my-2 bg-gray-100 dark:bg-slate-800 rounded-md w-92"
                      >
                        <div>
                          <Link
                            href={`/test/${test.id}`}
                            className="font-semibold space-x-2"
                          >
                            {test.name}
                          </Link>
                          <p>Description: {test.description}</p>
                        </div>
                        <div>
                          <h3>
                            Start: {test.start_time.substring(0, 10)}{" "}
                            {new Date(test.start_time).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </h3>
                          <h3>
                            End: {test.end_time.substring(0, 10)}{" "}
                            {new Date(test.end_time).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </h3>
                        </div>
                      </Card>
                    ))
                  : null}
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Dialog>
    </>
  );
}
