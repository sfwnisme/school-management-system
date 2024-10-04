import { getCurrentUser } from "@/lib/actions";
import React from "react";
import Drawer from "../dashboard-layout/drawer";
import { IMUser } from "@/definitions";

type Props = {
  children: React.ReactNode;
};

export default async function DrawerContainer(props: Props) {
  const user = await getCurrentUser();
  let userDetails = {
    username: "current user error",
    name: "current user error",
    image: undefined,
    role: ["current user error"],
  };
  if (user?.status !== "error") {
    userDetails = {
      username: user?.data?.userName,
      name: user?.data?.fullName,
      image: user?.data?.imagePath,
      role: user?.data?.roles,
    };
  }

  return (
    <>
      <Drawer userDetails={userDetails as unknown as IMUser}>
        {props.children}
      </Drawer>
    </>
  );
}
