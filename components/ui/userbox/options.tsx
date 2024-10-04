"use client";
import React from "react";
import Avatar from "./avatar";
import Dropdown from "./dropdown";
import { IMUser } from "@/definitions";

type Props = {
  userDetails?: IMUser;
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
        <Avatar userDetails={props?.userDetails} />
      </div>
      {toggleAvatarList ? <Dropdown userDetails={props?.userDetails} /> : null}
    </div>
  );
}
