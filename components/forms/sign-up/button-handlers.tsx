"use client";

import { Button } from "@/components/ui/button";
import { useAuthContextHook } from "@/context/use-auth-context";
import { useSignUpForm } from "@/hooks/sign-up/use-sign-up";
import Link from "next/link";
import { useFormContext } from "react-hook-form";

type Props = {};

const ButtonHandler = (props: Props) => {
  const { setCurrentStep, currentStep } = useAuthContextHook();
  const { formState, getFieldState, getValues } = useFormContext();
  const { onGenerateOTP } = useSignUpForm();

  const { isDirty: isName } = getFieldState("userName", formState);
  const { isDirty: isEmail } = getFieldState("email", formState);
  const { isDirty: isPassword } = getFieldState("password", formState);

  // console.log(currentStep);
  

  if (currentStep === 3) {
    return (
      <div className="w-full flex flex-col gap-3 items-center">
        <Button type="submit" className="w-full">
          Create an account
        </Button>
        <p className="text-gravel hover:text-cream transition-colors">
          Already have an account?{" "}
          <Link href="/auth/sign-in" className="font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    );
  }

  if (currentStep === 2) {
    // console.log("✅", isName, isEmail, isPassword);

    return (
      <div className="w-full flex flex-col gap-3 items-center">
        <Button
          type="submit"
          className="w-full"
          {...(isName &&
            isEmail &&
            isPassword && {
              onClick: () =>
                onGenerateOTP(
                  getValues("email"),
                  getValues("password"),
                  setCurrentStep
                ),
            })}
        >
          Continue
        </Button>
        <p className="text-gravel hover:text-cream transition-colors">
          Already have an account?{" "}
          <Link href="/auth/sign-in" className="font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-3 items-center">
      <Button
        type="submit"
        className="w-full"
        onClick={() => setCurrentStep((prev: number) => prev + 1)}
      >
        Continue
      </Button>
      <p className="text-gravel hover:text-cream transition-colors">
        Already have an account?{" "}
        <Link href="/auth/sign-in" className="font-semibold">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default ButtonHandler;
