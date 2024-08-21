"use client";

import React, { useEffect } from "react";
import { Book, Headphones, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserButton } from "@clerk/nextjs";
import TaskButton from "../task/task-button";

type Props = {};

const InfoBar = (props: Props) => {

  return (
    <div className="flex flex-row justify-end gap-6 items-center px-4 py-4 w-full dark:bg-black ">
      {/* <span className="flex items-center gap-2 font-bold">
        <p className="text-sm font-light text-gray-300">Free</p>
      </span> */}
      <span className="flex items-center">
        {/* <Search />
        <Input
          placeholder="Quick Search"
          className="border-none bg-transparent"
        /> */}
        <TaskButton/>
      </span>
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger>
            <Headphones />
          </TooltipTrigger>
          <TooltipContent>
            <p>Contact Support</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger>
            <Book />
          </TooltipTrigger>
          <TooltipContent>
            <p>Guide</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <UserButton />
    </div>
  );
};

export default InfoBar;
