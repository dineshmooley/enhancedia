"use client";
import { useState, useEffect } from "react";
import { Card } from "../../(components)/ui/card";
import { Button } from "../../(components)/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "../../(components)/ui/alert-dialog";
import {
  GetTestService,
  DeleteTestService,
  UpdateTestService,
} from "../../../lib/services/tests/service";
import { getRole } from "../../../lib/services/users/service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  getTopics,
  getPsychometricQuestions,
  getQuestionsByTopic,
  getTopicsByType,
  QuestionToTest,
} from "../../../lib/services/questions/service";
import {
  Dialog,
  DialogTrigger,
  DialogFooter,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "../../(components)/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectValue,
  SelectGroup,
} from "../../(components)/ui/select";
import { Trash2Icon } from "lucide-react";
import { Label } from "../../(components)/ui/label";
import { Input } from "../../(components)/ui/input";
import { useSession } from "next-auth/react";

const TestById = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { data: token } = useSession();
  const [role, setRole] = useState<string>("");
  const [test, setTest] = useState<any>(null);
  const [topics, setTopics] = useState<any>(null);
  const [questions, setQuestions] = useState<any>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(null);

  const fetchRole = async () => {
    try {
      const res = await getRole();
      if (res) {
        setRole(res.role);
      } else {
        toast.error("Failed to fetch role");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTest = async () => {
    try {
      setOpen(false);
      const res = await GetTestService(params.id);
      if (res) {
        setTest(res);
        fetchRole();
      } else {
        toast.error("Failed to fetch test");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPsychometric = async () => {
    try {
      setTopics(null);
      const res = await getPsychometricQuestions();
      if (res) {
        setQuestions(res.data);
      } else {
        toast.error("Failed to fetch psychometric questions");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTopics = async (type: string) => {
    try {
      const res = await getTopicsByType(type);
      if (res) {
        setTopics(res.topics);
      } else {
        toast.error("Failed to fetch topics");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchQuestionsByTopic = async (topic: string) => {
    try {
      const res = await getQuestionsByTopic(topic);
      if (res) {
        setQuestions(res.data);
      } else {
        toast.error("Failed to fetch questions");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addQuestionToTest = async (selectedQuestion, action) => {
    try {
      const res = await QuestionToTest(selectedQuestion, params.id, action);
      if (res) {
        action == "add"
          ? toast.success("Question added successfully")
          : toast.success("Question removed successfully");
        if (action == "add") {
          test.data.Total = test.data.Total + res.data.marks;
        } else if (action == "remove") {
          test.data.Total = test.data.Total - res.data.marks;
        }
        updateTest();
        fetchTest();
      } else {
        toast.error("Failed to add question");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateTest = async () => {
    try {
      const res = await UpdateTestService(test.data.id, test.data);
      if (res) {
        toast.success("Test updated successfully");
        fetchTest();
      } else {
        toast.error("Failed to update test");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTest = async () => {
    try {
      const res = await DeleteTestService(params.id);
      if (res) {
        toast.success("Test deleted successfully");
        router.push(`/class/${test.data.classId}`);
      } else {
        toast.error("Failed to delete test");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTest();
    setSelectedQuestion(null);
  }, []);

  if (!test) {
    return <div>Loading...</div>;
  }

  if (role == "student") {
    return (
      <>
        <p>test begins here</p>
      </>
    );
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <div className="container mt-5">
          <Card className=" dark:bg-slate-900 shadow-md">
            <div className="flex p-4 justify-between items-center">
              <h2 className="text-3xl font-bold tracking-tight me-4 align-middle">
                {test.data.name}{" "}
                <span className="text-sm">
                  {test.data.Total
                    ? `(Total Marks: ${test.data.Total})`
                    : `Total Marks: 0`}
                </span>
                <span className="text-sm">
                  {" ,"}
                  Duration: {test.data.duration} mins
                </span>
              </h2>
              <div>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="me-3"
                    onClick={() => {
                      setDialog({
                        title: "Select the topic and question",
                        description: "add questions to test",
                        action: "add",
                      });
                    }}
                  >
                    Add Questions
                  </Button>
                </DialogTrigger>
                <DialogContent className="">
                  <DialogHeader>
                    <DialogTitle>{dialog?.title}</DialogTitle>
                  </DialogHeader>
                  {dialog?.action == "add" ? (
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-4">
                        <label htmlFor="topic">Select Type</label>
                        <Select
                          onValueChange={(value) => {
                            value == "psychometric"
                              ? fetchPsychometric()
                              : fetchTopics(value);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a topic" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Type</SelectLabel>
                              <SelectItem value="psychometric">
                                Psychometric
                              </SelectItem>
                              <SelectItem value="aptitude">Aptitude</SelectItem>
                              <SelectItem value="core">Core</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      {topics && (
                        <div className="grid gap-4">
                          <label htmlFor="topic">Select Topic</label>
                          <Select
                            onValueChange={(value) => {
                              fetchQuestionsByTopic(value);
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a topic" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Topics</SelectLabel>
                                {topics?.map((topic: any) => (
                                  <SelectItem
                                    key={topic.value}
                                    value={topic.value}
                                  >
                                    {topic.label}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                      {questions && (
                        <div className="grid gap-4">
                          <label htmlFor="question">Select Question</label>
                          <Select
                            onValueChange={(value) => {
                              setSelectedQuestion(value);
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a question" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Questions</SelectLabel>
                                {questions?.map((question: any) => (
                                  <SelectItem
                                    key={question.id}
                                    value={question.id}
                                  >
                                    {question.question}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Title
                        </Label>
                        <Input
                          className="col-span-3"
                          placeholder={test.data.name}
                          onChange={(e) =>
                            setTest({
                              ...test,
                              data: { ...test.data, name: e.target.value },
                            })
                          }
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Description
                        </Label>
                        <Input
                          className="col-span-3"
                          placeholder={test.data.description}
                          onChange={(e) =>
                            setTest({
                              ...test,
                              data: {
                                ...test.data,
                                description: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Duration (in mins)
                        </Label>
                        <Input
                          type="number"
                          className="col-span-3"
                          placeholder={test.data.duration}
                          onChange={(e) =>
                            setTest({
                              ...test,
                              data: {
                                ...test.data,
                                duration: parseInt(e.target.value),
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                  )}
                  <DialogFooter>
                    <Button
                      type="submit"
                      onClick={() => {
                        dialog.action == "add"
                          ? addQuestionToTest(selectedQuestion, "add")
                          : updateTest();
                      }}
                    >
                      {dialog?.action}
                    </Button>
                  </DialogFooter>
                </DialogContent>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="me-3"
                    onClick={() => {
                      setDialog({
                        title: "Edit",
                        description: "Edit the details",
                        action: "edit",
                      });
                    }}
                  >
                    Edit
                  </Button>
                </DialogTrigger>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete test and associated results.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-destructive"
                        onClick={() => deleteTest()}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </Card>
          <Card className="mt-5">
            <div className="p-5">
              <h2 className="text-2xl font-bold">Questions</h2>
              <div className="mt-5">
                {test?.questionBase?.map((question: any, index: number) => (
                  <div key={question.id} className="flex justify-between mt-3">
                    <div className="">
                      <h3 className="text-xl font-bold">
                        {index + 1}. {question.question}{" "}
                        {question.marks ? `(${question.marks} marks)` : ""}
                      </h3>
                      <p>{question.answer}</p>
                    </div>
                    <Trash2Icon
                      color="red"
                      size={24}
                      onClick={() => {
                        addQuestionToTest(question.id, "remove");
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </Dialog>
    </>
  );
};

export default TestById;
