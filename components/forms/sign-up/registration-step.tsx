"use client";

import { Spinner } from "@/components/spinner";
import { useAuthContextHook } from "@/context/use-auth-context";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import TypeSelectionForm from "./type-selection-form";
import { TYPES } from "@prisma/client";

const LoadingSpinner = () => <Spinner noPadding={false} />;

const DetailForm = dynamic(() => import("./account-details-form"), {
  ssr: false,
  loading: LoadingSpinner,
});

const OTPForm = dynamic(() => import("./otp-form"), {
  ssr: false,
  loading: LoadingSpinner,
});

type Props = {};

const RegistrationFormStep = (props: Props) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  const { currentStep } = useAuthContextHook();
  const [onOTP, setOnOTP] = useState<string>("");
  const [onUseType, setOnUseType] = useState<TYPES>(TYPES.PERSONAL);

  // console.log("onOTP : " , onOTP, onUseType);

  setValue("otp", onOTP);

  switch (currentStep) {
    case 1:
      return (
         <TypeSelectionForm
          register={register}
          useType={onUseType}
          setUseType={setOnUseType}
        />
      );
    case 2:
      return <DetailForm errors={errors} register={register} />;
    case 3:
      return <OTPForm onOTP={onOTP} setOTP={setOnOTP} />;
  } 

  return <div>RegistrationFormStep</div>;
};

export default RegistrationFormStep;
