import { TYPES } from "@prisma/client";
import { z, ZodType } from "zod";

export type UserRegistrationProps = {
  type: TYPES;
  userName: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  otp: string;
};

export const UserRegistrationSchema: ZodType<UserRegistrationProps> = z
  .object({
    type: z.nativeEnum(TYPES),
    userName: z
      .string()
      .min(3, { message: "your userName be atleast 3 characters long" }),
    email: z.string().email({ message: "Incorrect email format" }),
    confirmEmail: z.string().email(),
    password: z
      .string()
      .min(8, { message: "your password must be atleast 8 characters long" })
      .max(64, {
        message: "your password can not be longer than 64 characters long",
      })
      .refine((value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ""), {
        message: "Password should contain only alphabets and numbers",
      }),
    confirmPassword: z.string(),
    otp: z.string().min(6, { message: "you must enter a 6 digit code" }),
  })
  .refine((schema) => schema.email === schema.confirmEmail, {
    message: "your email not match",
    path: ["confirmEmail"],
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export type UserLoginProps = {
  email: string;
  password: string;
};

export const UserLoginSchema: ZodType<UserLoginProps> = z.object({
  email: z.string().email({ message: "you did not enter a valid email" }),
  password: z
    .string()
    .min(8, { message: "your password must be atleast 8 characters long" })
    .max(64, {
      message: "your password can not be longer than 64 characters long",
    }),
});
