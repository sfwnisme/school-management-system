// "use client";
"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { isTokenValid, renewTokenIfNeeded } from "./actions";
type Props = {
  children: React.ReactNode;
  route: "public" | "protected";
};
export default async function IsAuth({ children, route }: Props) {
  const checkTokenIfValid = await isTokenValid();

  // check if the token expired
  renewTokenIfNeeded();

  if (checkTokenIfValid === undefined && route === "protected") {
    revalidatePath("/login");
    redirect("/login");
  } else if (checkTokenIfValid !== undefined && route === "public") {
    revalidatePath("/dashboard");
    redirect("/dashboard");
  }
  revalidatePath("/dashboard");
  return <>{children}</>;
}
