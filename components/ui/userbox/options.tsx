"use client";
import React from "react";
import Avatar from "./avatar";
import Dropdown from "./dropdown";

type Props = {
  userDetails?: {
    name: string;
    username: string;
    image: string | null;
  };
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
      {toggleAvatarList ? (
          <Dropdown userDetails={props?.userDetails} />
      ) : null}
    </div>
  );
}
