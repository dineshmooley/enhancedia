import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../(components)/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../(components)/ui/dialog";
import { Input } from "../(components)/ui/input";
import { Label } from "../(components)/ui/label";
import { Plus } from "lucide-react";
import { Button } from "../(components)/ui/button";

const Departments = () => {
  const dept = [
    "Information Technology",
    "Computer Science Engineering",
    "Electrical and Electronics Engineering",
    "Electronics and Communication Engineering",
    "Mechanical Engineering",
  ];
  return (
    <div className="container">
      <div className="flex my-16 justify-between">
        <h1 className="text-5xl">Departments</h1>
        <Button variant="outline" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex">
        {dept.map((depts) => (
          <Card className="hover:bg-slate-500  ml-6">
            <CardHeader>
              <CardTitle>{depts}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Departments;
