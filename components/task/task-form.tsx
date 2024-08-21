"use client";

import { createTask } from "@/actions/task";
import { TaskProps, TaskSchema } from "@/schemas/task.schema";
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
};

const TaskForm = ({ subTitle, title }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    setValue,
  } = useForm<TaskProps>({
    resolver: zodResolver(TaskSchema),
  });

  const router = useRouter();
  const { setClose } = useModal();


  console.log("error: ", errors);

  const onSubmit: SubmitHandler<TaskProps> = async (values: TaskProps) => {
    try {
      console.log("values: ", values);

      const newValue: TaskProps = {
        title: values.title,
        description: values.description,
        status: values.status,
        deadLine: values.deadLine
      };

      const task = await createTask(newValue);

      if (task.status !== 200) {
        toast.error(task.message);
      }

      toast.success(task.message);
      router.refresh();

      setClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="w-full max-w-[650px] border-none">
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
            className="w-full flex flex-col gap-10 justify-center items-center"
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Give Title"
                {...register("title")}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Give Description (optional)"
                {...register("description")}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="deadLine">Deadline</Label>
              <DatePickerWithPresets
                onChange={(date: any) => setValue("deadLine", date)} // Set the selected date in form
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Label>Status</Label>
              <RadioGroup
                onValueChange={(value: any) => setValue("status", value)}
                className="flex gap-4"
                defaultValue="incomplete"
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

            <div className=" w-full">
              <Button
                className="font-bold w-full transition-all tracking-tight self-start hover:bg-black hover:text-white border-[1px]"
                disabled={isLoading}
              >
                {isLoading ? <Spinner noPadding /> : <span>Add Task</span>}
              </Button>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskForm;
