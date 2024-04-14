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
import { getQuestions } from "../../lib/services/questions/service";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../(components)/ui/dialog";
import { CreateQuestion } from "../../lib/services/questions/service";
import { Textarea } from "../(components)/ui/textarea";
import { Input } from "../(components)/ui/input";
import { PlusIcon, TrashIcon } from "lucide-react";
import { ScrollArea } from "../(components)/ui/scrollarea";
import { RadioGroup, RadioGroupItem } from "../(components)/ui/radio-group";
import { toast } from "sonner";

const Questions = () => {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState(null);
  const [questions, setQuestions] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const [code, setCode] = React.useState(false);

  const fetchQuestions = async () => {
    try {
      const data = await getQuestions();
      console.log("the data is ", data);
      setQuestions(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // const Topic = async () => {
  //   try {
  //     const res = await getTopics();
  //     if (res) {
  //       setTopics(res.topics);
  //     }
  //   } catch {
  //     return [];
  //   }
  // };

  const AddQuestion = async (data: any) => {
    try {
      const res = await CreateQuestion(data);
      if (res.message == "Success") {
        setOpen(false);
        toast.success("Question added successfully");
        fetchQuestions();
      } else {
        toast.error("Question not added");
      }
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="container mt-5">
        <Card className=" dark:bg-slate-900 shadow-md">
          <div className="flex p-4 justify-between items-center">
            <h2 className="text-3xl font-bold tracking-tight me-4 align-middle">
              Question Base
            </h2>
            <DialogTrigger
              asChild
              onClick={() => {
                setData(null);
                setData({ ...data, question: "" });
              }}
            >
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
                      value={data?.question}
                      onChange={(e) => {
                        setData({ ...data, question: e.target.value });
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-1 items-center gap-4">
                    <Label htmlFor="name" className="font-semibold text-md">
                      Mark (optional)
                    </Label>
                    <Input
                      id="name"
                      placeholder="2"
                      onChange={(e) => {
                        setData({ ...data, marks: parseInt(e.target.value) });
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-1 items-center gap-4">
                    <RadioGroup
                      defaultValue="none"
                      className="flex flex-row"
                      onValueChange={(e) => {
                        if (e == "code") {
                          setCode(true);
                          setData({ ...data, code: null });
                        } else {
                          setData({ ...data, code: null });
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
                      <MDEditor
                        value={data?.code}
                        onChange={(value) => {
                          setData({ ...data, code: value });
                        }}
                      />
                    </div>
                  )}
                  <div className="grid grid-cols-1 items-center gap-4">
                    <Label htmlFor="name" className="font-semibold text-md">
                      Type
                    </Label>
                    <Select
                      required
                      onValueChange={(value) => {
                        setData({ ...data, type: value });
                      }}
                    >
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
                    <Input
                      id="name"
                      autoCapitalize="none"
                      placeholder="Enter topic"
                      onChange={(e) => {
                        setData({ ...data, topic: e.target.value });
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-1 items-center gap-4">
                    <Label htmlFor="name" className="font-semibold text-md">
                      Choices
                      <Button
                        variant="outline"
                        className="ms-3 rounded-full"
                        onClick={() => {
                          if (count == 0) {
                            setData({ ...data, choice: [] });
                          }
                          setCount(count + 1);
                        }}
                      >
                        <PlusIcon />
                      </Button>
                    </Label>
                    <div className="grid grid-cols-2 gap-4">
                      {[...Array(count)].map((_, i) => (
                        <div
                          className="grid grid-cols-1 items-center gap-4"
                          key={i}
                        >
                          <Label
                            htmlFor="name"
                            className="font-semibold text-md"
                          >
                            Option {i + 1}
                            <Button
                              variant="ghost"
                              className="ms-2 rounded-full"
                              onClick={() => {
                                if (data.choice[i] == data.answer) {
                                  delete data.answer;
                                }
                                data.choice.splice(i, 1);
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
                            onChange={(e) => {
                              const updatedChoice = [...data.choice];
                              updatedChoice[i] = e.target.value;
                              setData({
                                ...data,
                                choice: updatedChoice,
                              });
                            }}
                          />
                          <Label
                            htmlFor="name"
                            className="font-semibold text-md flex items-center space-x-2"
                          >
                            <span>correct (optional)</span>
                            <RadioGroup
                              defaultValue="no"
                              className="flex flex-row"
                              onValueChange={(e) => {
                                setData({
                                  ...data,
                                  answer: e == "true" ? data?.choice[i] : null,
                                });
                              }}
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="false" id="r1" />
                                <Label htmlFor="r1">No</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="true" id="r2" />
                                <Label htmlFor="r2">Yes</Label>
                              </div>
                            </RadioGroup>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollArea>
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={() => {
                    AddQuestion(data);
                  }}
                >
                  Add
                </Button>
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

export default Questions;
