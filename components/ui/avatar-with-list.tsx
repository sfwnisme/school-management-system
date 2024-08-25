"use client";
import Image from "next/image";
import React from "react";
import { userAvatarNavlinks } from "../../lib/nav-links";
import Link from "next/link";
import Button from "./button-with-link";
import { handleLogout } from "@/lib/utils";
import Cookies from "js-cookie";
import { TOKEN } from "@/lib/client-cookies";
// import { gCookie, TOKEN } from "@/lib/client-cookies";
// import { handleLogout } from "@/lib/actions";

type AvatarType = {
  src: string;
  height?: number;
  width?: number;
  alt: string;
};

const List = (props: {
  event: React.MouseEventHandler<HTMLAnchorElement> | undefined;
}) => {
  // const token = TOKEN;
  const token = Cookies.get("token");
  const listData =
    token !== undefined
      ? userAvatarNavlinks.protected
      : userAvatarNavlinks.global;
  const userList = listData?.map((link) => (
    <Link
      href={link?.href}
      className={` bg-white hover:bg-gray-100 duration-150 text-gray-700 w-full text-sm sm:text-base font-normal p-1 cursor-pointer rounded`}
      key={link?.title}
      onClick={props.event}
    >
      {link?.title}
    </Link>
  ));
  return (
    <>
      {userList}
      {token !== undefined && (
        <Button
          value="logout"
          size="sm"
          variant="danger"
          onClick={handleLogout}
          width="full"
        />
      )}
    </>
  );
};

export default function AvatarWithList(props: AvatarType) {
  let { src, height, width, alt } = props;

  // default values
  src = src || "/assets/logo.svg";
  height = height || 30;
  width = width || 30;
  alt = alt || "avatar";

  // functions
  const [toggleAvatarList, setToggleAvatarList] =
    React.useState<boolean>(false);
  function handleToggleAvatarList() {
    setToggleAvatarList((prev) => !prev);
  }

  return (
    <div>
      <div className="group">
        <div
          className={`border border-gray-300 p-1 rounded-lg overflow-hidden cursor-pointer`}
          onClick={handleToggleAvatarList}
          title="click for options"
        >
          <Image
            src={src}
            height={height}
            width={width}
            alt={alt}
            className={`h-[${height}] md:h-[40px] w-[${width}] md:w-[40px] rounded`}
          />
        </div>
      </div>
      {toggleAvatarList ? (
        <>
          <div className="z-10 absolute shadow-xl shadow-black/[0.03] right-6 top-[calc(100%+10px)] bg-white border border-gray-200 rounded-md p-1 flex flex-col flex-wrap items-start justify-start gap-2 min-w-[150px] md:min-w-[200px]">
            <List event={handleToggleAvatarList} />
          </div>
        </>
      ) : null}
    </div>
  );
}
