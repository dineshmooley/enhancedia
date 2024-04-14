"use client";

import { useState, useEffect } from "react";
import { Card } from "../../(components)/ui/card";
import {
  getQuestion,
  DeleteQuestion,
} from "../../../lib/services/questions/service";
import { Label } from "../../(components)/ui/label";
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import MDEditor from "@uiw/react-md-editor";

const QuestionsID = ({ params }: { params: { id: string } }) => {
  const [question, setQuestion] = useState(null);
  const router = useRouter();

  const FetchQuestion = async () => {
    try {
      const result = await getQuestion(params.id);
      setQuestion(result.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    FetchQuestion();
  }, [params.id]);

  if (!question) return <div>Loading...</div>;

  return (
    <>
      <div className="container mt-5">
        <Card className=" dark:bg-slate-900 shadow-md">
          <div className="flex p-4 justify-between items-center">
            <h2 className="text-3xl font-bold tracking-tight me-4 align-middle">
              Question
            </h2>
            <div>
              <Button variant="outline" className="me-3">
                Edit
              </Button>
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
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-destructive"
                      onClick={() => {
                        DeleteQuestion(params.id);
                        toast.success("Question Deleted Successfully");
                        router.push("/questions");
                      }}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </Card>
        <Card className="mt-3 p-5">
          <div className="grid gap-4 py-4 px-1">
            <div className="flex items-start gap-4">
              <Label htmlFor="name" className="font-semibold text-md">
                Question:
              </Label>
              {question.question}
            </div>
            {question.code && (
              <div className="flex items-start gap-4">
                <Label htmlFor="name" className="font-semibold text-md">
                  Code:
                </Label>
                <MDEditor.Markdown
                  className="bg-slate-800 p-2 rounded-md w-full overflow-x-auto"
                  source={question.code}
                  style={{ whiteSpace: "pre-wrap" }}
                />
              </div>
            )}
            <div className="flex items-start gap-4">
              <Label htmlFor="name" className="font-semibold text-md">
                Type:
              </Label>
              {question.type}
            </div>
            {question.topic && (
              <div className="flex items-start gap-4">
                <Label htmlFor="name" className="font-semibold text-md">
                  Topic:
                </Label>
                {question.topic}
              </div>
            )}
            <div className="flex items-start gap-4">
              <Label htmlFor="name" className="font-semibold text-md">
                choices:
              </Label>
              {question.choice.map((item: any, index: number) => (
                <span key={index}>{item}</span>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default QuestionsID;
