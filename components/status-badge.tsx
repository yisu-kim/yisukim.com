import { Badge } from "./ui/badge";

export const StatusBadge = () => {
  return (
    <Badge
      className="flex gap-2 bg-emerald-50 dark:bg-emerald-900"
      variant="outline"
    >
      <span className="relative h-2 w-2 rounded-full bg-emerald-300 before:absolute before:h-full before:w-full before:animate-pulse before:rounded-full before:bg-emerald-300 dark:bg-emerald-400 dark:before:bg-emerald-400"></span>
      <span className="text-xs font-normal text-emerald-600 dark:text-emerald-300">
        Open to Work
      </span>
    </Badge>
  );
};
