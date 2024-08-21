import TaskFilterSidebar from "@/components/task/taskFilterForm";
import TaskFilterFormProvider from "@/components/task/taskFilterFormProvider";
import { TaskFilterProps } from "@/schemas/task.schema";
import React from "react";

interface Props {
  searchParams: {
    query?: string;
    complete?: string;
    orderBy?: "latest" | "oldest" | "deadline";
    overdue?: string;
    page?: string;
  };
}

function TasksPage({
  searchParams: { complete, orderBy, overdue, page, query },
}: Props) {
  const filterValues: TaskFilterProps = {
    query,
    orderBy,
    complete: complete === "true",
    overdue: overdue === "true",
  };

  return (
    <main className="m-auto my-4 max-w-5xl space-y-10 px-3">
      <div className="space-y-3 text-center">
        <h1 className="text-lg md:text-xl text-cream">Manage Your Tasks</h1>
        <p className="text-gravel ">
          Use the filters below to find specific tasks.
        </p>
      </div>
      <TaskFilterFormProvider>
        <section className="flex flex-col gap-4 md:flex-row">
          <div>
            <TaskFilterSidebar defaultValues={filterValues} />
          </div>
        </section>
      </TaskFilterFormProvider>
    </main>
  );
}

export default TasksPage;
