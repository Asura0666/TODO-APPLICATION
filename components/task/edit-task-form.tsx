import { createTask, updateTask } from "@/actions/task";
import {
  EditTaskProps,
  EditTaskSchema,
  TaskProps,
  TaskSchema,
} from "@/schemas/task.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { DatePickerWithPresets } from "../ui/datePickerWithPresets";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Spinner } from "../spinner";
import { toast } from "sonner";
import { useModal } from "@/providers/modal-provider";

type Props = {
  title?: string;
  subTitle?: string;
  id: string;
};

const EditTaskForm = ({ subTitle, title, id }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<EditTaskProps>({
    resolver: zodResolver(EditTaskSchema),
  });

  const router = useRouter();
  const { setClose } = useModal();

  // console.log("error: ", errors);

  const onSubmit: SubmitHandler<EditTaskProps> = async (
    values: EditTaskProps
  ) => {
    try {
      // console.log("values: ", values);
      const { title, description, status, deadLine } = values;

      const formattedDate = deadLine ? deadLine.toISOString() : ""; // Convert to ISO string
      const updatedTask = await updateTask({
        status,
        title,
        description,
        deadLine: formattedDate,
        taskId: id,
      });

      if (updatedTask.status !== 200) {
        toast.error(updatedTask.message);
      }

      toast.success(updatedTask.message);
      router.refresh();

      setClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="w-full max-w-[700px] border-none overflow-hidden">
      {title && subTitle && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{subTitle}</CardDescription>
        </CardHeader>
      )}

      <CardContent>
        <div className="flex flex-col items-center w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-10 justify-center items-center p-4"
          >
            <div className="flex items-center gap-4 w-full">
              <Label htmlFor="title" className="font-normal w-1/4">
                Title
              </Label>
              <Input
                id="title"
                placeholder="Give Title"
                {...register("title")}
                className="flex-1"
              />
            </div>
            <div className="flex items-center gap-4 w-full">
              <Label htmlFor="description" className="font-normal w-1/4">
                Description
              </Label>
              <Input
                id="description"
                placeholder="Give Description (optional)"
                {...register("description")}
                className="flex-1"
              />
            </div>
            <div className="flex items-center gap-4 w-full">
              <Label htmlFor="deadLine" className="font-normal w-1/4">
                Deadline
              </Label>
              <DatePickerWithPresets
                className="flex-1"
                onChange={(date: any) => setValue("deadLine", date)} // Set the selected date in form
              />
            </div>
            <div className="flex items-center gap-4 w-full">
              <Label className="font-normal w-1/4">Status</Label>
              <RadioGroup
                onValueChange={(value: any) =>
                  setValue("status", value === "true")
                }
                className="flex gap-4 flex-1"
              >
                <Label className="flex items-center gap-2">
                  <RadioGroupItem value="true" />
                  Complete
                </Label>
                <Label className="flex items-center gap-2">
                  <RadioGroupItem value="false" />
                  Incomplete
                </Label>
              </RadioGroup>
            </div>

            <div className="w-1/2 flex justify-center items-center">
              <Button
                className="font-bold w-full transition-all tracking-tight self-start hover:bg-black hover:text-white border-[1px]"
                disabled={isSubmitting}
              >
                {isSubmitting ? <Spinner noPadding /> : <span>Edit Task</span>}
              </Button>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default EditTaskForm;
