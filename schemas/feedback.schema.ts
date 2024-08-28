import { z, ZodType } from "zod";

export type FeedbackProps = {
  issue: string;
  description: string;
};

export const FeedbackSchema: ZodType<FeedbackProps>  = z.object({
  issue: z.string({message: 'explain the issue'}),
  description: z.string({message: 'please describe issue' })
})

