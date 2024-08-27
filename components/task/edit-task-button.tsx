import { useModal } from "@/providers/modal-provider";
import { Button } from "../ui/button";
import { Pen } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { deleteTask } from "@/actions/task";
import { toast } from "sonner";
import CustomDialog from "../global/custom-dialog";
import EditTaskForm from "./edit-task-form";

const EditTaskButton = ({ id }: { id: string }) => {
  const { setOpen } = useModal();

  const handleClick = () => {
    setOpen(
      <CustomDialog
        title="Are you absolutely sure?"
        subheading="This action cannot be undone. This will permanently delete your task and remove your task data from our servers."
      >
        <EditTaskForm id={id}/>
      </CustomDialog>
    );
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>
          <Button
            size="icon"
            className="dark:bg-cream/80"
            onClick={handleClick}
          >
            <Pen size={20} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Edit Task</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default EditTaskButton;
