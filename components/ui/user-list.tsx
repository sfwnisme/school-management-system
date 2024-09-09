"use client";
import React, { useState } from "react";
import Avatar from "./userbox/avatar";
import Dropdown from "./userbox/dropdown";
import { userAvatarNavlinks } from "@/lib/nav-links";
import Button from "./button";
import { handleLogout } from "@/lib/utils";
import { getCookie } from "cookies-next";

type Props = {};

export default function UserList({}: Props) {
  const [toggleList, setToggleList] = useState(false);
  const [userData, setUserData] = useState({});
  const handleToggleList = () => setToggleList((prev) => !prev);

  console.log(userData);

  const token = getCookie("token");
  const listData = token
    ? userAvatarNavlinks?.protected
    : userAvatarNavlinks?.public;

  console.log(listData);

  return (
    <div>
      <div onClick={handleToggleList}>
        <Avatar />
      </div>
      {toggleList && (
        <div className="z-10 absolute shadow-xl shadow-black/[0.03] right-6 top-[calc(100%+10px)] bg-white border border-gray-200 rounded-md p-1 flex flex-col flex-wrap items-start justify-start gap-2 min-w-[150px] md:min-w-[200px]">
          <Dropdown
            list={listData}
            userDetails={{ fullName: "", roles: ["Admin"] }}
          >
            {token && (
              <Button
                value="Logout"
                variant="danger"
                size="sm"
                onClick={handleLogout}
              />
            )}
          </Dropdown>
        </div>
      )}
    </div>
  );
}
