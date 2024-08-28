"use client";

import { getAllFeedback } from "@/actions/feedback";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import FeedbackListItem from "./feedbackListItem";
import { ScrollArea } from "../ui/scroll-area";

type Props = {};

const FeedbackResult = (props: Props) => {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getAllFeedback();

        console.log("response: ", response);

        if (response.status === 200) {
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }

        setFeedbacks(response.data!);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <main>
      <ScrollArea className="h-[550px] w-auto">
        {feedbacks?.map((feedback) => (
          <div className="mb-4" key={feedback.id}>
            <FeedbackListItem feedback={feedback} />
          </div>
        ))}
      </ScrollArea>

      {feedbacks.length === 0 && (
        <p className="m-auto text-center text-xl">
          No Feedbacks found. Try adjusting your search filters
        </p>
      )}
    </main>
  );
};

export default FeedbackResult;
