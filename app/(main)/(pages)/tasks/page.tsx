import TaskFilterSidebar from "@/components/task/taskFilterForm";
import TaskFilterFormProvider from "@/components/task/taskFilterFormProvider";
import TaskListItem from "@/components/task/taskListItem";
import TaskResults from "@/components/task/taskResults";
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
  searchParams: { complete, orderBy, overdue, page = "1", query },
}: Props) {
  const filterValues: TaskFilterProps = {
    query,
    orderBy,
    complete: complete ? complete === "true" : undefined,
    overdue: overdue === "true",
  };

  return (
    <TaskFilterFormProvider>
      <main className="m-auto my-4 max-w-5xl px-3 space-y-10">
        <div className="space-y-3 text-center">
          <h1 className="text-lg md:text-xl text-cream">Manage Your Tasks</h1>
          <p className="text-cream/60">Use the filters below to find specific tasks.</p>
        </div>

        {/* Grid Layout for Main Content */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full">
          {/* Task Results takes 3 columns on medium to large screens, full width on small screens */}
          <div className="col-span-1 md:col-span-3 h-full overflow-auto">
            <TaskResults filterValues={filterValues} page={Number(page)} />
          </div>
          
          {/* Sidebar takes 1 column on medium to large screens, full width on small screens */}
          <div className="col-span-1">
            <TaskFilterSidebar defaultValues={filterValues} />
          </div>
        </section>
      </main>
    </TaskFilterFormProvider>
  );
}

export default TasksPage;
