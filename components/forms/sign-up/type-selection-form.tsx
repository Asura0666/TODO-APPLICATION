import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import UserTypeCard from "./user-type-card";
import { TYPES } from "@prisma/client";

type Props = {
  register: UseFormRegister<FieldValues>;
  useType: TYPES;
  setUseType: React.Dispatch<React.SetStateAction<TYPES>>;
};

const TypeSelectionForm = ({ register, setUseType, useType }: Props) => {
  return (
    <div className="">
      <h2 className="text-cream md:text-4xl font-bold">Create an account</h2>
      <p className="text-gravel md:text-sm mb-4">
        Tell us about yourself! What do you do? Let’s tailor your
        <br /> experience so it best suits you.
      </p>
      <div className="flex flex-col gap-4">
        <UserTypeCard
          register={register}
          setUseType={setUseType}
          useType={useType}
          value={TYPES.PERSONAL}
          title="Personal Use"
          text="Ideal for individuals who want to stay organized and manage their tasks effectively. This option is perfect for personal productivity and everyday task management."
        />
        <UserTypeCard
          register={register}
          setUseType={setUseType}
          useType={useType}
          value={TYPES.BUSINESS}
          title="Business Use"
          text="Designed for professionals and businesses who need to collaborate, manage projects, and streamline their workflow. This option is tailored for team management and business operations."
        />
      </div>
    </div>
  );
};

export default TypeSelectionForm;
