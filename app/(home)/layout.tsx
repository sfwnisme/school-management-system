import Nav from "@/components/ui/nav";
import { IClientResponse, IMUser, IRole, IUser } from "@/definitions";
import { getCurrentUser } from "@/lib/actions";
import IsRoleAuth from "@/lib/is-role-auth";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default async function layout({ children }: Props) {
  const user = (await getCurrentUser()) as IClientResponse<IUser>;
  console.log(user)
  return (
    <div>
      <Nav isDashboard={false} user={user} />
      {/* <IsRoleAuth> */}
      <div className="container mx-auto">{children}</div>
      {/* </IsRoleAuth> */}
    </div>
  );
}
