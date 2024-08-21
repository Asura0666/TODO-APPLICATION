"use client";

import { TaskFilterProps, TaskFilterSchema } from "@/schemas/task.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const useTaskFilter = () => {
  const router = useRouter();

  const methods = useForm<TaskFilterProps>({
    resolver: zodResolver(TaskFilterSchema),
    mode: "onChange",
  });

  const onHandleSubmit = methods.handleSubmit(
    async (values: TaskFilterProps) => {
      const searchParams = new URLSearchParams({
        ...(values.query && { query: values.query.trim() }),
        ...(values.complete !== undefined && {
          complete: String(values.complete),
        }),
        ...(values.overdue !== undefined && {
          overdue: String(values.overdue),
        }),
        ...(values.orderBy && { orderBy: values.orderBy }),
      });

      router.push(`/tasks?${searchParams.toString()}`);
    }
  );

  return {
    methods,
    onHandleSubmit,
  };
};

export default useTaskFilter;
