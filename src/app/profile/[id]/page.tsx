import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../(components)/ui/card";

const Displays = [
  {
    title: "Name",
    value: "Samsson",
  },
  {
    title: "Department",
    value: "Information Technology",
  },
  {
    title: "Batch",
    value: "20-24",
  },
];

const Profile = () => {
  return (
    <div className="container">
      <h1 className="text-5xl my-16">Profile</h1>
      <div>
        <Card>
          <CardContent className="grid gap-4">
            <div>
              {Displays.map((display, index) => (
                <div
                  key={index}
                  className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none my-2">
                      {display.title}
                    </p>
                    <p className="text-sm text-muted-foreground leading-none text-nowrap">
                      {display.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
