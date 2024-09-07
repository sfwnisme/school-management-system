// "use client";
// "use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getCurrentUser, isTokenValid, renewTokenIfNeeded } from "./actions";
import { childrenType } from "@/definitions";

export default async function IsAuth({ children }: childrenType) {
  const checkTokenIfValid = await isTokenValid();
  console.log(checkTokenIfValid);
  const currentUser = await getCurrentUser();

  //check if the token expired
  renewTokenIfNeeded();

  console.log(currentUser);
  if (checkTokenIfValid === undefined) {
    revalidatePath("/login");
    redirect("/login");
  }
  revalidatePath("/dashboard");
  return <>{children}</>;
}
