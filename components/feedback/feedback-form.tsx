"use client";

import { createFeedback } from "@/actions/feedback";
import { FeedbackProps, FeedbackSchema } from "@/schemas/feedback.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Spinner } from "../spinner";

type Props = {
  title?: string;
  subTitle?: string;
};

const FeedbackForm = ({ subTitle, title }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<FeedbackProps>({
    resolver: zodResolver(FeedbackSchema),
  });

  const router = useRouter();

  console.log("error: ", errors);

  const onSubmit: SubmitHandler<FeedbackProps> = async (
    values: FeedbackProps
  ) => {
    try {
      console.log("values: ", values);
      const { issue, description } = values;

      const res = await createFeedback({
        issue,
        description,
      });

      if (res.status !== 200) {
        toast.error(res.message);
        reset();
      }

      toast.success(res.message);
      reset()
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="w-full max-w-[700px] border overflow-hidden">
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
                Issue
              </Label>
              <Input
                id="title"
                placeholder="describe the issue"
                {...register("issue")}
                className="flex-1"
              />
            </div>
            <div className="flex items-center gap-4 w-full">
              <Label htmlFor="description" className="font-normal w-1/4">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Give detail Description"
                {...register("description")}
                className="flex-1"
              />
            </div>
            <div className="w-1/2 flex justify-center items-center">
              <Button
                className="font-bold w-full transition-all tracking-tight self-start hover:bg-black hover:text-white border-[1px]"
                disabled={isSubmitting}
              >
                {isSubmitting ? <Spinner noPadding /> : <span>Submit</span>}
              </Button>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedbackForm;
