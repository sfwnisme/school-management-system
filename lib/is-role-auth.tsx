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
  const currentUserRole = currentUser?.data && currentUser?.data.roles;

  // if the current user's role do not equal the authentic role; redirect to home '/'
  if (currentUser?.data) {
    if (!currentUserRole.includes("Admin")) {
      revalidatePath("/");
      redirect("/");
    }
  } else {
    console.log("hi I");
  }
  //if the current user's role not equal the authentic role; redirect to dashboard
  return <>{children}</>;
}
