"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../(components)/ui/card";
import MDEditor from "@uiw/react-md-editor";
import { Label } from "../(components)/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "../(components)/ui/select";
import { Button } from "../(components)/ui/button";
import { DataTable } from "../(components)/ui/question-table/Data-table";
import { columns } from "../(components)/ui/question-table/columns";
import { getQuestions } from "../../lib/services/tests/service";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../(components)/ui/dialog";
import { getTopics } from "../../lib/services/tests/service";
import { Switch } from "../(components)/ui/switch";
import { Textarea } from "../(components)/ui/textarea";
import { Input } from "../(components)/ui/input";
import { PlusIcon, TrashIcon } from "lucide-react";
import { ScrollArea } from "../(components)/ui/scrollarea";
import { RadioGroup, RadioGroupItem } from "../(components)/ui/radio-group";

const Tests = () => {
  const [questions, setQuestions] = React.useState([]);
  const [topics, setTopics] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const [code, setCode] = React.useState(false);
  const [value, setValue] = React.useState("**Hello world!!!**");

  const fetchQuestions = async () => {
    try {
      const data = await getQuestions();
      console.log("the data is ", data);
      setQuestions(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const Topic = async () => {
    try {
      const res = await getTopics();
      if (res) {
        setTopics(res.topics);
      }
    } catch {
      return [];
    }
  };

  React.useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <Dialog>
      <div className="container mt-5">
        <Card className=" dark:bg-slate-900 shadow-md">
          <div className="flex p-4 justify-between items-center">
            <h2 className="text-3xl font-bold tracking-tight me-4 align-middle">
              Question Base
            </h2>
            <DialogTrigger asChild>
              <Button variant="outline" className="font-semibold">
                Add Questions
              </Button>
            </DialogTrigger>
            <DialogContent className="">
              <DialogHeader>
                <DialogTitle>Add Question</DialogTitle>
                <DialogDescription>
                  Add questions to the question base
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className="h-80 w-full">
                <div className="grid gap-4 py-4 px-1">
                  <div className="grid grid-cols-2 items-center gap-4">
                    <Label htmlFor="name" className="font-semibold text-md">
                      Question
                    </Label>
                    <Textarea
                      id="name"
                      className="col-span-2"
                      placeholder="Enter question"
                    />
                  </div>
                  <div className="grid grid-cols-1 items-center gap-4">
                    <RadioGroup
                      defaultValue="none"
                      className="flex flex-row"
                      onValueChange={(e) => {
                        if (e == "code") {
                          setCode(true);
                        } else {
                          setCode(false);
                        }
                      }}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="none" id="r1" />
                        <Label htmlFor="r1">None</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="code" id="r2" />
                        <Label htmlFor="r2">Snippet/image</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  {code && (
                    <div className="grid grid-cols-1 items-center gap-4">
                      <Label htmlFor="name" className="font-semibold text-md">
                        Insert
                      </Label>
                      <MDEditor value={value} onChange={setValue} />
                    </div>
                  )}
                  <div className="grid grid-cols-1 items-center gap-4">
                    <Label htmlFor="name" className="font-semibold text-md">
                      Type
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select Type</SelectLabel>
                          <SelectItem value="psychometric">
                            Psychometric
                          </SelectItem>
                          <SelectItem value="aptitude">Aptitude</SelectItem>
                          <SelectItem value="core">Core</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-1 items-center gap-4">
                    <Label htmlFor="name" className="font-semibold text-md">
                      Topic
                    </Label>
                    <Input id="name" placeholder="Enter topic" />
                  </div>
                  <div className="grid grid-cols-1 items-center gap-4">
                    <Label htmlFor="name" className="font-semibold text-md">
                      Choices
                      <Button
                        variant="outline"
                        className="ms-3 rounded-full"
                        onClick={() => {
                          setCount(count + 1);
                        }}
                      >
                        <PlusIcon />
                      </Button>
                    </Label>
                    <div className="grid grid-cols-2 gap-4">
                      {[...Array(count)].map((_, i) => (
                        <div className="grid grid-cols-1 items-center gap-4">
                          <Label
                            htmlFor="name"
                            className="font-semibold text-md"
                          >
                            Option {i + 1}
                            <Button
                              variant="ghost"
                              className="ms-2 rounded-full"
                              onClick={() => {
                                setCount(count - 1);
                              }}
                            >
                              <TrashIcon size={15} />
                            </Button>
                          </Label>
                          <Input
                            id="name"
                            className="col-span-3"
                            placeholder="Enter option"
                          />
                          <Label
                            htmlFor="name"
                            className="font-semibold text-md flex items-center space-x-2"
                          >
                            <span>correct (optional)</span>
                            <Switch id="correct" />
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollArea>

              <DialogFooter>
                <Button type="submit">Add</Button>
              </DialogFooter>
            </DialogContent>
          </div>
        </Card>
        <Card className="p-5 mt-5">
          <DataTable columns={columns} data={questions} />
        </Card>
      </div>
    </Dialog>
  );
};

type testCardProps = {
  qno: number;
  qn: string;
  opta: string;
  optb: string;
};

function TestCards({ qno, qn, opta, optb }: testCardProps) {
  return (
    <Card className=" col-4 w-[350px] my-4" key={qno}>
      <CardHeader>
        <CardTitle>Question {qno}</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">{qn}</Label>
              <Select>
                <SelectTrigger id="name">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="1">{opta}</SelectItem>
                  <SelectItem value="2">{optb}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Reset</Button>
      </CardFooter>
    </Card>
  );
}

export default Tests;
