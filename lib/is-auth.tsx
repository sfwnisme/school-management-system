"use client";
import React, { useEffect } from "react";
import { isAuth } from "./utils";
import { redirect } from "next/navigation";

type Props = {};

export default function IsAuth({ children }: childrenType) {
  const authenticated = isAuth;
  useEffect(() => {
    if (!authenticated) {
      return redirect("/login");
    }
  }, []);

  if (!authenticated) null;
  return <>{children}</>;
}
