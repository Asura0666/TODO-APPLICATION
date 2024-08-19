import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="h-screen flex w-full justify-center">
      <div className="w-[600px] flex flex-col items-start p-6">
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-1 rounded-lg m-2">
          <p className="text-2xl font-semibold">To</p>
          <Image
            src="/fuzzieLogo.png"
            width={15}
            height={15}
            alt="todo logo"
            className="shadow-sm"
          />
          <p className="text-2xl font-semibold">Do</p>
        </Link>
      </div>
        {children}
      </div>
      <div className="hidden lg:flex flex-1 w-full max-h-full max-w-[3000px] overflow-hidden relative bg-cream flex-col pt-10 md:px-10 lg:px-15 gap-3">
        <h2 className="text-gravel md:text-4xl font-bold z-10">
          Welcome to Your Ultimate To-Do App!
        </h2>
        <p className="text-iridium md:text-sm mb-10 z-10">
          Stay organized and boost your productivity with our intuitive and
          feature-rich task manager.
          <br />
          Create, manage, and complete your tasks effortlessly.
        </p>
        <Image
          src="/images/app-ui.png"
          alt="app image"
          loading="lazy"
          sizes="30"
          className="relative shrink-0 !w-[800px] !h-auto my-auto right-0 z-0 md:hidden lg:block"
          width={0}
          height={0}
        />
      </div>
    </div>
  );
};

export default Layout;
