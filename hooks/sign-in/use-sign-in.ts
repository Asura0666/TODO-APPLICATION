"use client";

import { UserLoginProps, UserLoginSchema } from "@/schemas/auth.schema";
import { useSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useSignInForm = () => {
  const { setActive, isLoaded, signIn } = useSignIn();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const methods = useForm<UserLoginProps>({
    resolver: zodResolver(UserLoginSchema),
    mode: "onChange",
  });

  const onHandleSubmit = methods.handleSubmit(
    async (values: UserLoginProps) => {
      if (!isLoaded) return;

      try {
        setLoading(true);
        const authenticated = await signIn.create({
          identifier: values.email,
          password: values.password,
        });

        if (authenticated.status === "complete") {
          await setActive({ session: authenticated.createdSessionId });
          toast.success("Welcome back!");
          router.push("/dashboard");
        }
      } catch (error: any) {
        if (error.errors[0].code === "form_password_incorrect") {
          toast.error("email/password is incorrect, try again!");
        }
      } finally {
        setLoading(false);
      }
    }
  );

  return { methods, onHandleSubmit, loading };
};
