"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import Button from "./button";
import { handleLogout } from "@/lib/utils";
import { userAvatarNavlinks } from "@/lib/nav-links";
import { usePathname } from "next/navigation";
import Badge from "./badge";
import { getCookie } from "cookies-next";
import { LogOut } from "lucide-react";

type AvatarType = {
  src: string;
  height?: number;
  width?: number;
  alt: string;
};

const List = (props: {
  event: React.MouseEventHandler<HTMLAnchorElement> | undefined;
}) => {
  const pathname = usePathname();

  const token = getCookie("token");
  const handleEvent = () => props.event;
  const listData =
    token !== undefined
      ? userAvatarNavlinks.protected
      : userAvatarNavlinks.public;
  const userList = listData?.map((link) =>
    pathname !== link?.href ? (
      <Link
        href={link?.href}
        className={` bg-white hover:bg-gray-100 duration-150 text-gray-700 w-full text-sm sm:text-base font-normal p-1 cursor-pointer rounded`}
        key={link?.title}
        onClick={handleEvent}
      >
        {link?.title}
      </Link>
    ) : null
  );
  const userDetails = (
    <div className="mb- flex items-start gap-1 w-full bg-gray-500 rounded p-1">
      <div className="flex-1">
        <p className="capitalize text-sm text-gray-100">safwan mohamed</p>
        <Badge variant="success">admin</Badge>
      </div>
      {token !== undefined && (
        <>
          <Button
            size="xs"
            variant="danger"
            onClick={handleLogout}
            // width="full"
          >
            <LogOut size={18} />
          </Button>
        </>
      )}
    </div>
  );
  return (
    <>
      {userDetails}
      {userList}
      {/* <hr className="w-full"/> */}
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
            className={`h-[40px] w-[40px] rounded`}
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
