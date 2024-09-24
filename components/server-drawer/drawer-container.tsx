import { getCurrentUser } from "@/lib/actions";
import React from "react";
import Drawer from "../dashboard-layout/drawer";

type Props = {
  children: React.ReactNode;
};

export default async function DrawerContainer(props: Props) {
  const user = await getCurrentUser();
  console.log(user);
  const userDetails = {
    username: user?.userName,
    name: user?.fullName,
    image: user?.imagePath,
    role: user?.roles,
  };
  console.log(userDetails.role);
  console.log(userDetails);

  return (
    <>
      <Drawer userDetails={userDetails}>{props.children}</Drawer>
    </>
  );
}
