import { formatDate } from "@/lib/utils";
import React from "react";

interface FeedbackData {
  feedback: {
    id: string;
    issue: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
}
const FeedbackListItem = ({
  feedback: { id, issue, description, createdAt, updatedAt },
}: FeedbackData) => {
  return (
    <article className="flex flex-col gap-4 rounded-lg p-5  dark:hover:bg-[#EEE0FF]/10 hover:bg-[#EEE0FF] shadow-md border">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold dark:text-cream/75 text-gravel">
          {issue}
        </h2>
        {/* <div className="flex items-center justify-center gap-2">
          <DeleteTaskButton id={id} />
          <EditTaskButton id={id} />
          <ShowStatus status={status} />
        </div> */}
      </div>
      <div className="dark:text-cream/50 text-gravel">
        {description ? (
          <p className="text-sm">{description}</p>
        ) : (
          <p className="italic dark:text-cream/50 text-gravel">
            No description available
          </p>
        )}
      </div>
      <div className="flex justify-between items-center">
        {/* <p className={`${status ? "text-green-600/75" : "text-red-600/75"}`}>
          Deadline: {formatDate(dead_line)}
        </p> */}
        <div className="text-sm text-gravel/50 space-y-1">
          <p>Created At: {formatDate(createdAt)}</p>
          <p>Updated At: {formatDate(updatedAt)}</p>
        </div>
      </div>
    </article>
  );
};

export default FeedbackListItem;
