// "use client";
"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
// import Loading from "@/components/ui/spin-loading";

export default async function IsAuth({ children }: childrenType) {
  const token = cookies().get("token")?.value;
  console.log("is-auth.tsx", token);
  if (!token) {
    revalidatePath("/login");
    redirect("/login");
  }
  return <>{children}</>;
}
