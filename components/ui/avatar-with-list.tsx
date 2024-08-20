"use client";
import Image from "next/image";
import React from "react";
import { isAuth } from "@/lib/utils";
import { userAvatarNavlinks } from "../../lib/nav-links";
import Link from "next/link";

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
          <Link
            href={link?.href}
            className="bg-white hover:bg-primary-50/20 text-primary-400 w-full text-base font-normal p-1 cursor-pointer rounded"
            key={link?.title}
            onClick={handleToggleAvatarList}
          >
            {link?.title}
          </Link>
        ) : isntProtected ? (
          <Link
            href={link?.href}
            className="bg-white hover:bg-primary-50/20 text-primary-400 w-full text-base font-normal p-1 cursor-pointer rounded"
            key={link?.title}
            onClick={handleToggleAvatarList}
          >
            {link?.title}
          </Link>
        ) : null}
      </>
    );
  });

  return (
    <div className={``}>
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
            className={`h-[${height}] md:h-[40px] w-[${width}] md:w-[40px]`}
          />
        </div>
      </div>
      {toggleAvatarList ? (
        <div className="absolute shaddow-sm right-6 top-[calc(100%+10px)] bg-white border border-primary-50 rounded-md p-1 flex flex-col flex-wrap items-start justify-start gap-2 min-w-[150px] md:min-w-[200px]">
          {content}
        </div>
      ) : null}
    </div>
  );
}
