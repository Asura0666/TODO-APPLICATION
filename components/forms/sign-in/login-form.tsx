"use client";

import { USER_LOGIN_FORM } from "@/constants/forms";
import React from "react";
import FormGenerator from "../form-generator";
import { useFormContext } from "react-hook-form";

type Props = {};

const LoginForm = (props: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <h2 className="text-cream md:text-4xl font-bold">Login</h2>
      <p className="text-gravel md:text-sm">
        You will receive a one time password
      </p>
      {USER_LOGIN_FORM.map((field) => (
        <FormGenerator
          key={field.id}
          {...field}
          errors={errors}
          register={register}
          name={field.name}
        />
      ))}
    </>
  );
};

export default LoginForm;
