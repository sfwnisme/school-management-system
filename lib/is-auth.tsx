// "use client";
// "use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getCurrentUser, isTokenValid, refreshTokenIfExpired } from "./actions";
import { Fragment } from "react";

type Props = {
  children: React.ReactNode;
  route: "public" | "protected";
};
export default async function IsAuth({ children, route }: Props) {
  const checkTokenIfValid = await isTokenValid();
  console.log(checkTokenIfValid?.isSuccess)

  // check if the token expired
  await refreshTokenIfExpired();

  if (!checkTokenIfValid?.isSuccess && route === "protected") {
    revalidatePath("/login");
    redirect("/login");
  } else if (checkTokenIfValid?.isSuccess && route === "public") {
    revalidatePath("/dashboard");
    redirect("/dashboard");
  }
  revalidatePath("/dashboard");
  return <Fragment>{children}</Fragment>;
}
