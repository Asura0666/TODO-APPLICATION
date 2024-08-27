"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import { useRouter } from "next/navigation";

export const getFilteredTasks = async ({
  query = "",
  complete,
  orderBy = "latest",
  overdue = false,
  page = 1,
}: {
  query?: string;
  complete?: boolean;
  orderBy?: string;
  overdue?: boolean;
  page?: number;
}) => {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        status: 401,
        message: "Unauthenticated!",
      };
    }

    const userId = user.id;

    const taskPerPage = 5;
    const skip = page > 0 ? (page - 1) * taskPerPage : 0; 
    
    const filters: Prisma.TaskWhereInput = {
      userId,

      ...(query && {
        OR: [
          {
            title: {
              contains: query.trim(),
              mode: Prisma.QueryMode.insensitive,
            },
          },
          {
            description: {
              contains: query.trim(),
              mode: Prisma.QueryMode.insensitive,
            },
          },
        ],
      }),

      ...(complete !== undefined && {
        status: complete,
      }),

      ...(overdue && {
        status: false,
        dead_line: {
          lt: new Date(),
        },
      }),
    };

    let orderByFilter: Prisma.Enumerable<Prisma.TaskOrderByWithRelationInput> =
      {};
    switch (orderBy) {
      case "latest":
        orderByFilter = { createdAt: "desc" };
        break;
      case "oldest":
        orderByFilter = { createdAt: "asc" };
        break;
      case "deadline":
        orderByFilter = { dead_line: "asc" };
        break;
      default:
        orderByFilter = { createdAt: "desc" };
    }

    const tasks = await client.task.findMany({
      where: filters,
      orderBy: orderByFilter,
      take: taskPerPage,
      skip: skip,
      select: {
        title: true,
        description: true,
        status: true,
        dead_line: true,
        createdAt: true,
        updatedAt: true,
        id: true,
      },
    });

    const totalTask = await client.task.count({ where: filters });

    return {
      status: 200,
      data: tasks,
      totalTask: totalTask,
      message: "All todos fetched successfully!",
    };
  } catch (error: any) {
    return {
      status: 500,
      message: "Internal server error",
      error: error.message,
    };
  }
};

export const getTaskById = async ({ taskId }: { taskId: string }) => {
  try {
    const user = await currentUser();

    if (!user) {
      return {
        status: 401,
        message: "Unauthenticated!",
      };
    }

    const userId = user.id;

    const task = await client.user.findUnique({
      where: {
        clerkId: userId,
      },
      select: {
        tasks: {
          where: {
            id: taskId,
          },
        },
      },
    });

    if (!task) {
      return {
        status: 404,
        message: "Todo not found!",
      };
    }

    return {
      status: 200,
      message: "Todo fetched successfully!",
      data: task,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Internal server error!",
      error: error,
    };
  }
};

export const createTask = async (
  status: boolean,
  title: string,
  description: string | undefined,
  deadLine: string
) => {
  try {
    console.log(status, title, description, deadLine);

    const parsedDate = new Date(deadLine);
    if (isNaN(parsedDate.getTime())) {
      throw new Error("Invalid date format");
    }

    const user = await currentUser();

    if (!user) {
      return {
        status: 401,
        message: "Unauthenticated!",
      };
    }

    const userId = user.id;

    const createdTask = await client.task.create({
      data: {
        title,
        description,
        dead_line: parsedDate,
        status,
        userId,
      },
    });

    return {
      status: 200,
      data: {
        id: createdTask.id,
        title: createdTask.title,
        description: createdTask.description,
        dead_line: createdTask.dead_line.toISOString(), // Convert date to string
        status: createdTask.status,
      },
      message: "Task created successfully!",
    };
  } catch (error: any) {
    console.log(error);
    return {
      status: 500,
      error: error.message, // Convert error to string
      message: "Internal server error!",
    };
  }
};

export const updateTask = async ({
  title,
  description,
  status,
  deadLine,
  taskId,
}: {
  title?: string;
  description?: string;
  deadLine?: Date;
  status?: boolean;
  taskId: string;
}) => {
  try {
    const user = await currentUser();

    if (!user) {
      return {
        status: 401,
        message: "Unauthenticated!",
      };
    }

    const task = await client.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      return {
        status: 404,
        message: "Task not found!",
      };
    }

    const updatedTask = await client.task.update({
      where: {
        id: taskId,
      },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(deadLine && { dead_line: deadLine }),
        ...(status !== undefined && { status }),
      },
    });

    return {
      status: 200,
      message: "Task updated successfully!",
      data: updatedTask,
    };
  } catch (error) {
    return {
      status: 500,
      error: error,
      message: "Internal server error!",
    };
  }
};

export const toggleTaskStatus = async ({ taskId }: { taskId: string }) => {
  try {
    const user = await currentUser();

    if (!user) {
      return {
        status: 401,
        message: "Unauthenticated!",
      };
    }

    const task = await client.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      return {
        status: 404,
        message: "Task not found!",
      };
    }

    const updatedTask = await client.task.update({
      where: {
        id: taskId,
      },
      data: {
        status: !task.status,
      },
    });

    return {
      status: 200,
      message: "Task status updated successfully!",
      data: updatedTask,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Internal server error!",
      error: error,
    };
  }
};

export const deleteTask = async ({ taskId }: { taskId: string }) => {
  try {
    const user = await currentUser();

    if (!user) {
      return {
        status: 401,
        message: "Unauthenticated!",
      };
    }

    const task = await client.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      return {
        status: 404,
        message: "Task not found!",
      };
    }

    await client.task.delete({
      where: {
        id: taskId,
      },
    })

    return {
      status: 200,
      message: "Task deleted successfully!",
    };
  } catch (error) {
    return {
      status: 500,
      message: "Internal server error!",
      error: error,
    };
  }
};
