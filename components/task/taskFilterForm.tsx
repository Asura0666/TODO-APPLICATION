"use client";

import { TASK_FILTER_FORM, taskOrderByType } from "@/constants/forms";
import React from "react";
import { useFormContext } from "react-hook-form";
import FormGenerator from "../forms/form-generator";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { TaskFilterProps } from "@/schemas/task.schema";
import Select from "../ui/select";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type Props = {
  defaultValues: TaskFilterProps;
};

const TaskFilterSidebar = ({ defaultValues }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <aside className="sticky top-0 h-fit rounded-lg border bg-background p-4 md:w-[260px]">
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="query">Search</Label>
          <Input
            defaultValue={defaultValues.query}
            id="query"
            placeholder="Search Task"
            {...register("query")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="type">OrderBy</Label>
          <Select
            id="orderBy"
            defaultValue={defaultValues.orderBy || "latest"}
            {...register("orderBy")}
          >
            {taskOrderByType.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex w-full flex-row space-y-2 md:flex-col lg:flex-row lg:items-center lg:space-y-0">
          <div className="flex grow items-center gap-1.5">
            <input
              id="complete"
              type="checkbox"
              className="scale-100 accent-black"
              defaultChecked={defaultValues.complete}
              {...register("complete")}
            />
            <Label htmlFor="complete">Complete</Label>
          </div>
          <div className="flex grow items-center gap-1.5">
            <input
              id="overdue"
              type="checkbox"
              className="scale-100 accent-black"
              defaultChecked={defaultValues.overdue}
              {...register("overdue")}
            />
            <Label htmlFor="overdue">Overdue</Label>
          </div>
        </div>

        <Button type="submit" className="w-full">
          Filter Tasks
        </Button>
      </div>
    </aside>
  );
};

export default TaskFilterSidebar;
