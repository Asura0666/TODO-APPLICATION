import { z, ZodType } from "zod";

export type TaskProps = {
  title: string;
  description?: string;
  deadLine: Date;
  status: boolean;
};

export const TaskSchema: ZodType<TaskProps> = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  description: z.string().optional(),
  deadLine: z.date(),
  status: z.boolean(),
});

