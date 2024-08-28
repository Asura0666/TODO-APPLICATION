"use server";

import { client } from "@/lib/prisma";
import { FeedbackProps } from "@/schemas/feedback.schema";
import { currentUser } from "@clerk/nextjs/server";

export const createFeedback = async ({ issue, description }: FeedbackProps) => {
  try {
    const user = await currentUser();

    if (!user) {
      return {
        status: 401,
        message: "Unauthenticated!",
      };
    }

    const userId = user.id;

    const createdFeedback = await client.feedback.create({
      data: {
        issue,
        description,
        userId,
      },
    });

    return {
      status: 200,
      data: createdFeedback,
      message: "feedback submitted successfully!",
    };
  } catch (error: any) {
    console.error(error.message);
    return {
      status: 500,
      error: error.message,
      message: "Internal server error",
    };
  }
};

export const updateFeedback = async ({
  description,
  issue,
  id,
}: {
  id: string;
  issue: string;
  description: string;
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

    const feedback = await client.feedback.findUnique({
      where: {
        id: id,
      },
    });

    if (!feedback) {
      return {
        status: 404,
        message: "Feedback not found",
      };
    }

    const updatedFeedback = await client.feedback.update({
      where: {
        id: id,
      },
      data: {
        ...(issue && { issue }),
        ...(description && { description }),
      },
    });

    return {
      status: 200,
      data: updatedFeedback,
      message: "feedback updated successfully!",
    };
  } catch (error: any) {
    console.error(error.message);
    return {
      status: 500,
      error: error.message,
      message: "Internal server error",
    };
  }
};

export const deleteFeedback = async ({id}:{id: string}) => {
  try {
    const user = await currentUser();

    if (!user) {
      return {
        status: 401,
        message: "Unauthenticated!",
      };
    }

    const userId = user.id;

    const feedback = await client.feedback.findUnique({
      where: {
        id: id,
      },
    });

    if (!feedback) {
      return {
        status: 404,
        message: "Feedback not found",
      };
    }

    const deletedFeedback = await client.feedback.delete({
      where: {
        id: id
      }
    })

    return {
      status: 200,
      message: "Feedback deleted successfully!",
    };

  } catch (error: any) {
    console.error(error.message);
    return {
      status: 500,
      error: error.message,
      message: "Internal server error",
    };
  }
}

export const getAllFeedback = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return {
        status: 401,
        message: "Unauthenticated!",
      };
    }

    const userId = user.id;


    const feedbacks = await client.feedback.findMany({
      where: {
        userId: userId
      },
      select: {
        id: true,
        issue: true,
        description: true,
        createdAt: true,
        updatedAt: true
      }
    })

    return {
      status: 200,
      data: feedbacks,
      message: "All feedback fetch successfully!"
    }

  } catch (error: any) {
    console.error(error.message);
    return {
      status: 500,
      error: error.message,
      message: "Internal server error",
    };
  }
}