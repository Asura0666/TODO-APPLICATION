"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSignUp } from "@clerk/nextjs";

import { useForm } from "react-hook-form";
import {
  UserRegistrationProps,
  UserRegistrationSchema,
} from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { onCompleteUserRegistration } from "@/actions/auth";

export const useSignUpForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { isLoaded, setActive, signUp } = useSignUp();

  const methods = useForm<UserRegistrationProps>({
    resolver: zodResolver(UserRegistrationSchema),
    mode: "onChange",
  });

  const onGenerateOTP = async (
    email: string,
    password: string,
    onNext: React.Dispatch<React.SetStateAction<number>>
  ) => {
    if (!isLoaded) return;

    try {
      const userCreated = await signUp.create({
        emailAddress: email,
        password: password,
      });

      const verifyMailSend = await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      onNext((prev) => prev + 1);
    } catch (error) {
      console.error(error);

      toast.error("something went wrong!");
    }
  };

  const onHandleSubmit = methods.handleSubmit(
    async (values: UserRegistrationProps) => {
      if (!isLoaded) return;

      try {
        setLoading(true);
        const completeSignUp = await signUp.attemptEmailAddressVerification({
          code: values.otp,
        });

        if (completeSignUp.status !== "complete") {
          toast.error("something went wrong!");
        }

        if (completeSignUp.status == "complete") {
          if (!signUp.createdUserId) return;

          const registered = await onCompleteUserRegistration(
            values.userName,
            signUp.createdUserId,
            values.type
          );

          if (registered?.status == 200 && registered.user) {
            await setActive({
              session: completeSignUp.createdSessionId,
            });

            toast.success(registered.message);

            setLoading(false);
            router.push("/dashboard");
          }

          if (registered.status !== 200) {
            toast.error(registered.message);
          }
        }
      } catch (error: any) {
        toast(error.errors[0].longMessage);
      }
    }
  );

  return {
    methods,
    onHandleSubmit,
    onGenerateOTP,
    loading,
  };
};
