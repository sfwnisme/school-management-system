// "use client";
"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { isTokenValid } from "./actions";
// import Loading from "@/components/ui/spin-loading";

export default async function IsAuth({ children }: childrenType) {
  const checkTokenIfValid = await isTokenValid();
  const status = checkTokenIfValid?.status
  console.log(status);
  // const token = cookies().get("token")?.value;
  // console.log("is-auth.tsx", token);
  if (!status) {
    revalidatePath("/login");
    redirect("/login");
  }
  return <>{children}</>;
}
