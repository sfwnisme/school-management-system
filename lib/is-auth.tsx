// "use client";
// "use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getCurrentUser, isTokenValid, refreshTokenIfExpired } from "./actions";
import { Fragment } from "react";
import { IFetchResponse2 } from "@/definitions";

type Props = {
  children: React.ReactNode;
  route: "public" | "protected";
};
export default async function IsAuth({ children, route }: Props) {
  const checkTokenIfValid = await isTokenValid();

  // check if the token expired
  await refreshTokenIfExpired();

  if (checkTokenIfValid === undefined && route === "protected") {
    revalidatePath("/login");
    redirect("/login");
  } else if (checkTokenIfValid !== undefined && route === "public") {
    revalidatePath("/dashboard");
    redirect("/dashboard");
  }
  revalidatePath("/dashboard");
  return <Fragment>{children}</Fragment>;
}
