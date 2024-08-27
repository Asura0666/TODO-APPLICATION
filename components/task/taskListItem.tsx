import { formatDate } from "@/lib/utils";
import { Pen, Trash } from "lucide-react";
import { Button } from "../ui/button";
import DeleteTaskButton from "./delete-task-button";

interface TaskData {
  task: {
    id: string;
    title: string;
    description: string | null;
    status: boolean;
    dead_line: Date;
    createdAt: Date;
    updatedAt: Date;
  };
}

const TaskListItem = ({
  task: { createdAt, updatedAt, dead_line, status, description, title, id },
}: TaskData) => {
  
  return (
    <article className="flex flex-col gap-4 rounded-lg p-5  dark:hover:bg-[#EEE0FF]/10 hover:bg-[#EEE0FF] shadow-md border">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold dark:text-cream/75 text-gravel">
          {title}
        </h2>
        <div className="flex items-center justify-center gap-2">
          <DeleteTaskButton id={id}/>
          <Button size="icon" className="dark:bg-cream/80">
            <Pen size={20} />
          </Button>
          <Button size="icon" className="dark:bg-cream/80">
            <span
              className={`inline-block h-4 w-4 text-sm font-semibold rounded-full ${
                status ? "bg-green-600/75" : "bg-red-600/75"
              }`}
            ></span>
          </Button>
        </div>
      </div>
      <div className="dark:text-cream/50 text-gravel">
        {description ? (
          <p className="text-sm">{description}</p>
        ) : (
          <p className="italic dark:text-cream/50 text-gravel">
            No description available
          </p>
        )}
      </div>
      <div className="flex justify-between items-center">
        <p className={`${status ? "text-green-600/75" : "text-red-600/75"}`}>
          Deadline: {formatDate(dead_line)}
        </p>
        <div className="text-sm text-gravel/50 space-y-1">
          <p>Created At: {formatDate(createdAt)}</p>
          <p>Updated At: {formatDate(updatedAt)}</p>
        </div>
      </div>
    </article>
  );
};

export default TaskListItem;
