import { useModal } from "@/providers/modal-provider";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import CustomAlert from "../global/custom-alert";
import { deleteTask } from "@/actions/task";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const DeleteTaskButton = ({ id }: { id: string }) => {
  const { setOpen } = useModal();

  const onSubmit = async () => {
    try {
      const res = await deleteTask({ taskId: id });

      if (res.status === 200) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }

    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleClick = () => {
    setOpen(
      <CustomAlert
        title="Are you absolutely sure?"
        subheading="This action cannot be undone. This will permanently delete your task and remove your task data from our servers."
      >
        <Button
          className="bg-red-700 hover:bg-red-500 dark:text-cream/75"
          onClick={onSubmit}
        >
          Delete
        </Button>
      </CustomAlert>
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
            <Trash size={20} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete Task</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default DeleteTaskButton;
