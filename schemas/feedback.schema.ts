import { z, ZodType } from "zod";

export type FeedbackProps = {
  issue: String;
  description: String;
};

export const FeedbackSchema: ZodType<FeedbackProps>  = z.object({
  issue: z.string({message: 'explain the issue'}),
  description: z.string({message: 'please describe issue' })
})

