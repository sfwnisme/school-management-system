"use client";
import React from "react";
import Avatar from "./avatar";
import Dropdown from "./dropdown";
import { IClientResponse, IUser } from "@/definitions";

type Props = {
  user?: IClientResponse<IUser>;
};

export default function Options(props: Props) {
  const [toggleAvatarList, setToggleAvatarList] =
    React.useState<boolean>(false);
  function handleToggleAvatarList() {
    setToggleAvatarList((prev) => !prev);
  }

  return (
    <div>
      <div onClick={handleToggleAvatarList}>
        <Avatar user={props?.user} />
      </div>
      {toggleAvatarList && <Dropdown user={props?.user} />}
    </div>
  );
}
