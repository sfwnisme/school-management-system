// "use client";
import { PanelLeft, User } from "lucide-react";
import React from "react";
import LogoLayout from "./logo-layout";
import { IClientResponse, IMUser, IUser, UpdateStateType } from "@/definitions";
import Options from "./userbox/options";

/**
 * @type isDashboard - boolean: you can change the boolean value to display main page or dashboard nav
 */

type Props = {
  toggleDrawer?: boolean;
  setToggleDrawer?: UpdateStateType;
  isDashboard: boolean;
  user?: IClientResponse<IUser>;
};

export default function Nav(props: Props) {
  const { toggleDrawer, setToggleDrawer, isDashboard } = props;

  function handleToggleDrawer() {
    setToggleDrawer?.((prev) => !prev);
  }

  let content;

  if (isDashboard) {
    content = (
      <nav className="z-20 w-full border-b p-4 relative bg-white">
        <ul className="flex items-stretch gap-2 justify-between">
          {!toggleDrawer ? (
            <li className="py-1 flex items-center gap-4">
              <PanelLeft
                size={40}
                className="stroke-[1.5] bg-gray-50 p-[2px] rounded text-gray-500 hover:text-gray-600 cursor-pointer"
                onClick={handleToggleDrawer}
              />
              <LogoLayout height={30} width={30} hasText={false} />
            </li>
          ) : null}
          <li className="px-3 py-1 ml-auto">
            <Options user={props?.user} />
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
            <Options user={props?.user} />
          </li>
        </ul>
      </nav>
    );
  }

  return content;
}
