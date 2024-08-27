import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";

type Props = {
  status: boolean;
};

const ShowStatus = ({ status }: Props) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>
          <Button size="icon" className="dark:bg-cream/80">
            <span
              className={`inline-block h-4 w-4 text-sm font-semibold rounded-full ${
                status ? "bg-green-600/75" : "bg-red-600/75"
              }`}
            ></span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Task status</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ShowStatus;
