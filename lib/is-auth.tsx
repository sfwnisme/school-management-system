// "use client";
import React, { useEffect } from "react";
import { isAuth } from "./utils";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
// import Loading from "@/components/ui/spin-loading";

export default function IsAuth({ children }: childrenType) {
  const token = cookies().get("token")?.value;
  console.log("is-auth.tsx", token);
  if (!token) {
    revalidatePath("/login");
    redirect("/login");
  }
  return <>{children}</>;
}
