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

export type TaskFilterProps = {
  query?: string;
  complete?: boolean;
  orderBy?: "latest" | "oldest" | "deadline";
  overdue?: boolean;
};

export const TaskFilterSchema: ZodType<TaskFilterProps> = z.object({
  query: z.string().optional(),
  complete: z.coerce.boolean().optional(),
  orderBy: z.enum(["latest", "oldest", "deadline"]).optional(),
  overdue: z.coerce.boolean().optional(),
});
