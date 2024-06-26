import { CrumpledPaperIcon, RocketIcon, GearIcon } from "@radix-ui/react-icons";
import { getTopics } from "../../../../lib/services/questions/service";

export const statuses = [
  {
    value: "psychometric",
    label: "Psychometric",
    icon: CrumpledPaperIcon,
  },
  {
    value: "aptitude",
    label: "Aptitude",
    icon: RocketIcon,
  },
  {
    value: "core",
    label: "core",
    icon: GearIcon,
  },
];

export const Topic = async () => {
  try {
    const res = await getTopics();
    return res.topics;
  } catch {
    return [];
  }
};
