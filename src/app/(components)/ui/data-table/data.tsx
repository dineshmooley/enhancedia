import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const statuses = [
  {
    value: "failed",
    label: "failed",
    icon: QuestionMarkCircledIcon,
  },
  //   {
  //     value: "todo",
  //     label: "Todo",
  //     icon: CircleIcon,
  //   },
  {
    value: "processing",
    label: "processing",
    icon: StopwatchIcon,
  },
  {
    value: "success",
    label: "success",
    icon: CheckCircledIcon,
  },
  //   {
  //     value: "canceled",
  //     label: "Canceled",
  //     icon: CrossCircledIcon,
  //   },
];
