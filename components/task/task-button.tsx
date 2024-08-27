import { useModal } from "@/providers/modal-provider";
import CustomModal from "../global/custom-modal";
import TaskForm from "./task-form";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const TaskButton = () => {
  const { setOpen } = useModal();

  const handleClick = () => {
    setOpen(
      <CustomModal
        title="Create Task"
        subheading="Fill out the form below to create a new task."
      >
        <TaskForm />
      </CustomModal>
    );
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>
          <Button size="icon" onClick={handleClick}>
            <Plus size={20} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add Task</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TaskButton;
