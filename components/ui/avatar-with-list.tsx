"use client";
import Image from "next/image";
import React from "react";
import { isAuth } from "@/lib/utils";
import { userAvatarNavlinks } from "../../lib/nav-links";
import Link from "next/link";
import { ArrowBigDown, ArrowDown } from "lucide-react";
import Button from "./button";
import { handleLogout } from "@/lib/utils";

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

  const content = userAvatarNavlinks?.map((link) => {
    const isProtected = isAuth && link?.protected === true;
    const isntProtected = !isAuth && link?.protected === false;

    return (
      <>
        {isProtected ? (
          <>
            {link?.divider && <hr className="w-full mt-4" />}
            {link?.type === "button" && (
              <Button
                value="logout"
                size="sm"
                variant="danger"
                onClick={link?.action}
                width="full"
              />
            )}
            {link?.type !== "button" && (
              <Link
                href={link?.href}
                className={` bg-white hover:bg-gray-100 duration-150 text-gray-700 w-full text-sm sm:text-base font-normal p-1 cursor-pointer rounded`}
                key={link?.title}
                onClick={handleToggleAvatarList}
              >
                {link?.title}
              </Link>
            )}
          </>
        ) : isntProtected ? (
          <>
            {link?.divider && <hr className="w-full mt-4" />}
            {link?.type === "button" && (
              <Button value="logout" size="sm" variant="danger" width="full" />
            )}
            {link?.type !== "button" && (
              <Link
                href={link?.href}
                className={` bg-white hover:bg-gray-100 duration-150 text-gray-700 w-full text-sm sm:text-base font-normal p-1 cursor-pointer rounded`}
                key={link?.title}
                onClick={handleToggleAvatarList}
              >
                {link?.title}
              </Link>
            )}
          </>
        ) : null}
      </>
    );
  });

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
            {content}
          </div>
        </>
      ) : null}
    </div>
  );
}
