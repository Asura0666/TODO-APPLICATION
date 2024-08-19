"use client";

import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TYPES } from "@prisma/client";

type Props = {
  value: string;
  title: string;
  text: string;
  register: UseFormRegister<FieldValues>;
  useType: TYPES
  setUseType: React.Dispatch<React.SetStateAction<TYPES>>;
};

const UserTypeCard = ({
  value,
  setUseType,
  text,
  register,
  useType,
  title,
}: Props) => {
  return (
    <Label htmlFor={value}>
      <Card
        className={cn(
          "w-full cursor-pointer",
          useType == value && "border-cream"
        )}
      >
        <CardContent className="flex justify-between p-2">
          <div className="flex items-center gap-3">
            <Card
              className={cn(
                "flex justify-center p-3",
                useType == value && "border-cream"
              )}
            >
              <User
                size={30}
                className={cn(
                  useType == value ? "text-cream" : "text-gravel"
                )}
              />
            </Card>
            <div className="">
              <CardDescription className="text-cream">
                {title}
              </CardDescription>
              <CardDescription className="text-gravel">
                {text}
              </CardDescription>
            </div>
          </div>
          <div>
            <div
              className={cn(
                "w-4 h-4 rounded-full",
                useType == value ? "bg-cream" : "bg-transparent"
              )}
            >
              <Input
                {...register("type", {
                  onChange: (event) => setUseType(event.target.value),
                })}
                value={value}
                id={value}
                className="hidden"
                type="radio"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </Label>
  );
};

export default UserTypeCard;
