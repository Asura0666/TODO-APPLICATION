"use client";

import { TaskFilterProps } from "@/schemas/task.schema";
import React, { useEffect, useState } from "react";
import TaskListItem from "./taskListItem";
import { getFilteredTasks } from "@/actions/task";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Props = {
  filterValues: TaskFilterProps;
  page?: number;
};

const TaskResults = ({ filterValues, page = 1 }: Props) => {
  const { complete, overdue, orderBy, query } = filterValues;

  // State for storing tasks and total count
  const [tasks, setTasks] = useState<any[]>([]); // Type any[] used for demonstration, replace with correct Task type
  const [totalTask, setTotalTask] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getFilteredTasks({
          complete,
          orderBy,
          overdue,
          query,
          page,
        });

        console.log("response: ", response);

        if (response.status === 200) {
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }

        setTasks(response.data!);
        setTotalTask(response.totalTask!);

        router.refresh();
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks();
  }, [complete, overdue, orderBy, query, page]);
  return (
    <main className="grow space-y-4 h-screen overflow-scroll scrollbar-hidden">
      <div>
        {tasks?.map((task) => (
          <div className="my-4" key={task.id}>
            <TaskListItem task={task} />
          </div>
        ))}

        {tasks.length === 0 && (
          <p className="m-auto text-center text-xl">
            No Tasks found. Try adjusting your search filters
          </p>
        )}

        <div className="my-4">
          {tasks.length > 0 && (
            <Pagination
              currentPage={page}
              totalPages={Math.ceil(totalTask / 5)}
              filterValues={filterValues}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default TaskResults;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  filterValues: TaskFilterProps;
}

function Pagination({
  currentPage,
  totalPages,
  filterValues: { query, orderBy, complete, overdue },
}: PaginationProps) {
  function generatePageLink(page: number) {
    const searchParams = new URLSearchParams({
      ...(query && { query: query.trim() }),
      ...(complete !== undefined && {
        complete: String(complete),
      }),
      ...(overdue !== undefined && {
        overdue: String(overdue),
      }),
      ...(orderBy && { orderBy: orderBy }),
      page: page.toString(),
    });

    return `/tasks?${searchParams.toString()}`;
  }

  return (
    <div className="flex justify-between items-center">
      <Link
        href={generatePageLink(currentPage - 1)}
        className={cn(
          "flex items-center gap-2 border px-3 hover:opacity-90 py-2 bg-slate-950 text-white rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          currentPage <= 1 && "invisible"
        )}
      >
        <ArrowLeft size={16} />
        Previous page
      </Link>
      <span className="font-semibold text-center">
        Page {currentPage} of {totalPages}
      </span>
      <Link
        href={generatePageLink(currentPage + 1)}
        className={cn(
          "flex items-center gap-2 border px-3 hover:opacity-90 py-2 bg-slate-950 text-white rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          currentPage >= totalPages && "invisible"
        )}
      >
        Next page
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
