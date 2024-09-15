import Nav from "@/components/ui/nav";
import { IMUser, IRole } from "@/definitions";
import { getCurrentUser } from "@/lib/actions";
import IsRoleAuth from "@/lib/is-role-auth";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default async function layout({ children }: Props) {
  const user = await getCurrentUser();
  const userDetails: IMUser = {
    username: user?.data.data.userName,
    name: user?.data.data.fullName,
    image: user?.data.data.imagePath,
    role: user?.data.data.roles || [],
  };

  console.log(userDetails.role);
  return (
    <div>
      <Nav isDashboard={false} userDetails={userDetails} />
      {/* <IsRoleAuth> */}
      <div className="container mx-auto">{children}</div>
      {/* </IsRoleAuth> */}
    </div>
  );
}
