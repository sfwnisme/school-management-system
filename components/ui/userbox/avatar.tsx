"use client";
import { User } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {
  userDetails?: {
    name: string;
    username: string;
    image: string | null;
  };
};

export default function Avatar(props: Props) {
  const image = props.userDetails?.image || "";
  const name = props.userDetails?.name || "full name";
  console.log(name);

  const userFirstLetters = `${name[0] + name[1]}`;

  // check if there is an image
  const isImage = Boolean(image.trim());

  const isLoggedin = Boolean(props.userDetails?.name);

  const displayImageOrNameLettersAvatar = (
    <div
      className={`size-12 border border-gray-300 bg-gray-200 rounded-md shadow-md shadow-gray-200 cursor-pointer select-none flex items-center justify-center`}
    >
      {isLoggedin ? (
        isImage ? (
          <Image
            src={image}
            alt={name}
            height={40}
            width={40}
            className="size-full"
          />
        ) : (
          <p className="size-full flex items-center justify-center uppercase">
            {userFirstLetters}
          </p>
        )
      ) : (
        <User size={30} className="text-gray-500" />
      )}
    </div>
  );

  return <div {...props}>{displayImageOrNameLettersAvatar}</div>;
}
