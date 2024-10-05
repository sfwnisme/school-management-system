import { getCurrentUser } from "@/lib/actions";
import React from "react";
import Drawer from "../dashboard-layout/drawer";
import { IClientResponse, IMUser, IUser } from "@/definitions";

type Props = {
  children: React.ReactNode;
};

export default async function DrawerContainer(props: Props) {
  const user = (await getCurrentUser()) as IClientResponse<IUser>;
  return (
    <>
      <Drawer user={user}>{props.children}</Drawer>
    </>
  );
}
