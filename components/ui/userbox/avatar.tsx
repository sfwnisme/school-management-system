"use client";
import { IClientResponse, IUser } from "@/definitions";
import { User } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {
  user?: IClientResponse<IUser>;
};

export default function Avatar({ user, ...rest }: Props) {
  let userFirstLetters = "IDLE";
  let isImageAvailable = false;
  if (user?.isSuccess) {
    const { fullName, imagePath } = user.data as IUser;
    userFirstLetters = fullName?.slice(0, 2) ?? "";
    isImageAvailable = Boolean(imagePath !== null);
  } else if (user?.isEmpty) {
    userFirstLetters = "UN";
    isImageAvailable = false;
  } else {
    isImageAvailable = false;
    userFirstLetters = "ER";
  }

  const displayImageOrNameLettersAvatar = (
    <div
      className={`size-12 border border-gray-300 bg-gray-50 rounded-md shadow-md shadow-gray-200 cursor-pointer select-none flex items-center justify-center`}
    >
      {user?.isSuccess && !user?.isEmpty && !user?.isError ? (
        isImageAvailable ? (
          <Image
            src={user.data?.imagePath ?? ""}
            alt={user.data?.fullName ?? ""}
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

  return <div {...rest}>{displayImageOrNameLettersAvatar}</div>;
}
