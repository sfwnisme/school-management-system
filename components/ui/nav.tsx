"use client";
import { PanelLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import LogoLayout from "./logo-layout";
import AvatarWithList from "./avatar-with-list";

type Props = {
  toggleDrawer?: boolean;
  setToggleDrawer?: UpdateStateType;
  isDashboard: boolean;
};

export default function Nav(props: Props) {
  const { toggleDrawer, setToggleDrawer, isDashboard } = props;

  function handleToggleDrawer() {
    setToggleDrawer?.((prev) => !prev);
  }

  let content;

  if (isDashboard) {
    content = (
      <nav className="w-full mb-6 border-b p-4 relative">
        <ul className="flex items-stretch gap-2 justify-between">
          {!toggleDrawer ? (
            <li className="py-1 flex items-center gap-4">
              <PanelLeft
                size={30}
                className="stroke-[1.5] bg-gray-50 p-[2px] rounded text-gray-500 hover:text-gray-600 cursor-pointer"
                onClick={handleToggleDrawer}
              />

              <LogoLayout height={30} width={30} hasText={false} />
            </li>
          ) : null}
          <li className="px-3 py-1 ml-auto">
            <AvatarWithList
              src="https://media.licdn.com/dms/image/v2/D4D03AQFtPWGRKCfKFQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1720437017398?e=1729728000&v=beta&t=bQkEWjG9YS4ii2qFWkb-NOJ1LwYyVkMuIXQk3v3ruoc"
              alt="user avatar"
              height={30}
              width={30}
            />
          </li>
        </ul>
      </nav>
    );
  } else if (!isDashboard) {
    content = (
      <nav className="w-full mb-6 border-b p-4 relative">
        <ul className="flex items-center gap-2 justify-between">
          <li>
            <LogoLayout height={30} width={30} hasText={false} />
          </li>
          <li className="px-3 py-1 ml-auto">
            <AvatarWithList
              src="https://media.licdn.com/dms/image/v2/D4D03AQFtPWGRKCfKFQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1720437017398?e=1729728000&v=beta&t=bQkEWjG9YS4ii2qFWkb-NOJ1LwYyVkMuIXQk3v3ruoc"
              alt="user avatar"
              height={30}
              width={30}
            />
          </li>
        </ul>
      </nav>
    );
  }

  return content;
}
