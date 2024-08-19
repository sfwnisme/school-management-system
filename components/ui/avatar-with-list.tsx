"use client";
import Image from "next/image";
import React from "react";

type AvatarType = {
  src: string;
  height?: number;
  width?: number;
  alt: string;
};

export default function AvatarWithList(props: AvatarType) {
  let { src, height, width, alt } = props;

  // default values
  src = src || "/assets/logo.svg";
  height = height || 30;
  width = width || 30;
  alt = alt || "avatar";

  // actions
  const [toggleAvatarList, setToggleAvatarList] =
    React.useState<boolean>(false);
  function handleToggleAvatarList() {
    setToggleAvatarList((prev) => !prev);
  }

  return (
    <div className="">
      <div className="group">
        <div
          className={`border-2 p-1 rounded-lg overflow-hidden cursor-pointer`}
          onClick={handleToggleAvatarList}
          title="click for options"
        >
          <Image
            src={src}
            height={height}
            width={width}
            alt={alt}
            className={`h-[${height}] w-[${width}]`}
          />
        </div>
      </div>
      {toggleAvatarList ? (
        <ul className="absolute right-6 top-[calc(100%+10px)] bg-white border border-primary-50 rounded-md p-1 flex flex-col flex-wrap items-start justify-start gap-2 min-w-[200px]">
          <li className="bg-white w-full text-base font-normal p-1 cursor-pointer">
            Profile
          </li>
          <li className="bg-white w-full text-base font-normal p-1 cursor-pointer">
            Dashboard
          </li>
          <li className="bg-white w-full text-base font-normal p-1 cursor-pointer">
            Settings
          </li>
          <li className="bg-white border-b w-full text-base font-normal p-1"></li>
          <li className="bg-white  w-full text-base font-normal p-1 cursor-pointer">
            Logout
          </li>
        </ul>
      ) : null}
    </div>
  );
}
