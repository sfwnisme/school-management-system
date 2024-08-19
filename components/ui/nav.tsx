import { PanelLeft } from "lucide-react";
import React from "react";
import LogoLayout from "./logo-layout";
import AvatarWithList from "./avatar-with-list";

type Props = {
  toggleDrawer: boolean;
  setToggleDrawer: UpdateStateType;
};

export default function Nav(props: Props) {
  const { toggleDrawer, setToggleDrawer } = props;

  function handleToggleDrawer() {
    setToggleDrawer((prev) => !prev);
  }

  return (
    <nav className="w-full mb-6 border-b p-4 relative">
      <ul className="flex items-stretch gap-2 justify-between">
        {!toggleDrawer ? (
          <li className="py-1 flex items-center gap-4">
            <PanelLeft
              size={30}
              className="text-primary-300 cursor-pointer"
              onClick={handleToggleDrawer}
            />

            <LogoLayout height={30} width={30} hasText={false} />
          </li>
        ) : null}
        <li className="px-3 py-1 ml-auto">
          <AvatarWithList
            src="https://media.licdn.com/dms/image/v2/D4D03AQFtPWGRKCfKFQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1720437017398?e=1729728000&v=beta&t=bQkEWjG9YS4ii2qFWkb-NOJ1LwYyVkMuIXQk3v3ruoc"
            alt="user avatar"
          />
          {/* <Avatar src="/assets/logo.svg" alt="avatar" /> */}
        </li>
      </ul>
    </nav>
  );
}
