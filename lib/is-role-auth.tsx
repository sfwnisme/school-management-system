import React from "react";
import { getCurrentUser, getInstructorById, getRolesByUserId } from "./actions";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { IClientResponse, IUser } from "@/definitions";
import { toast } from "react-toastify";
import NotFound from "@/app/dashboard/not-found";

type Props = {
  children: React.ReactNode;
};

export default async function IsRoleAuth({ children }: Props) {
  const currentUser = (await getCurrentUser()) as IClientResponse<IUser>;
  const currentUserRole = currentUser?.data?.roles;
  console.log(currentUserRole);
  console.log(await getInstructorById(22));

  // if the current user's role do not equal the authentic role; redirect to home '/'
  if (currentUser && !currentUserRole?.includes("Admin")) {
    revalidatePath("/");
    return <NotFound />
    // redirect("/");
  }

  //if the current user's role not equal the authentic role; redirect to dashboard
  return <>{children}</>;
}
