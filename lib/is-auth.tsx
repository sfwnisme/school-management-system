// "use client";
"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getCurrentUser, isTokenValid } from "./actions";

export default async function IsAuth({ children }: childrenType) {
  const checkTokenIfValid = await isTokenValid();
  const status = checkTokenIfValid?.status;
  const currentUser = await getCurrentUser();
  console.log(currentUser);
  console.log(status);
  if (status === undefined) {
    revalidatePath("/login");
    redirect("/login");
  }
  revalidatePath("/dashboard");
  return <>{children}</>;
}
