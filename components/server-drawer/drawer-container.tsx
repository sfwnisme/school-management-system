import { getCurrentUser } from "@/lib/actions";
import React from "react";
import Drawer from "../dashboard-layout/drawer";

type Props = {
  children: React.ReactNode;
};

export default async function DrawerContainer(props: Props) {
  const user = await getCurrentUser();
  console.log(user?.data.data);
  const userDetails = {
    username: user?.data.data.userName,
    name: user?.data.data.fullName,
    image: user?.data.data.imagePath,
  };
  console.log(userDetails);

  return (
    <>
      <Drawer userDetails={userDetails}>{props.children}</Drawer>
    </>
  );
}
