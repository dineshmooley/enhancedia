import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../(components)/ui/card";

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
      <h1 className="text-5xl my-16">Departments</h1>
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
