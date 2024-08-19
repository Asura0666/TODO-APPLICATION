"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { TYPES } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const onCompleteUserRegistration = async (
  userName: string,
  clerkId: string,
  type: TYPES
) => {
  if (!userName || !clerkId || !type) {
    return { status: 400, message: "Missing required fields!" };
  }

  try {
    const registered = await client.user.create({
      data: {
        userName,
        clerkId,
        type,
      },
      select: {
        id: true,
        userName: true,
        type: true,
      },
    });

    if (!registered)
      return {
        status: 400,
        message: "something went wrong while registeration!",
      };

    return {
      status: 200,
      user: registered,
      message: "user registered successfully!",
    };
  } catch (error) {
    return { status: 500, message: "something went wrong!", error: error };
  }
};

export const onLoginUser = async (req: NextRequest) => {
  const user = await currentUser();

  if (!user) {
    const signInUrl = new URL("/auth/sign-in", req.url);
    signInUrl.searchParams.set("showToast", "true");

    return NextResponse.redirect(signInUrl);
  }
  
  try {
    const authenticated = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        userName: true,
        id: true,
        type: true,
      },
    });

    if (!authenticated) {
      const signUpUrl = new URL("/auth/sign-up", req.url);
      signUpUrl.searchParams.set("showToast", "true");

      return NextResponse.redirect(signUpUrl);
    }

    return {
      status: 200,
      user: authenticated,
      message: "user login successfully",
    };
  } catch (error) {
    return { status: 500, message: "something went wrong!", error: error };
  }
};
