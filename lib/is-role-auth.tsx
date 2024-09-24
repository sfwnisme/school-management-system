import React from "react";
import { getCurrentUser, getRolesByUserId } from "./actions";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
// import { RolesEnum } from "@/definitions";

type Props = {
  children: React.ReactNode;
};
enum RolesEnum {
  Admin = "Admin",
  User = "User",
  HR = "HR",
}
const roles = {
  Admin: "Admin",
  User: "User",
  HR: "HR",
};
export default async function IsRoleAuth({ children }: Props) {
  const currentUser = await getCurrentUser();
  const currentUserRole = await currentUser?.roles;
  const headerList = headers();
  // console.log(headerList.get("referer")?.split("/"));
  // console.log(currentUserRole);

  console.log(currentUser);
  console.log(!currentUserRole.includes("Admin"));

  // if the current user's role do not equal the authentic role; redirect to home '/'
  if (!currentUserRole.includes("Admin")) {
    revalidatePath("/");
    redirect("/");
  }
  //if the current user's role not equal the authentic role; redirect to dashboard
  return <>{children}</>;
}
