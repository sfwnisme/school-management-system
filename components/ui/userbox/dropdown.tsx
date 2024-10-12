"use client";
// import { usePathname } from "next/navigation";
import React, { useState, useTransition } from "react";
import Link from "next/link";
import Badge from "../badge";
import { userAvatarNavlinks } from "@/lib/data";
import { usePathname } from "next/navigation";
import Button from "../button";
import { Loader, LogOut } from "lucide-react";
import { deleteCookie } from "cookies-next";
import { isTokenValid } from "@/lib/actions";
import { IClientResponse, IUser } from "@/definitions";

type Props = {
  children?: React.ReactNode;
  user?: IClientResponse<IUser>;
};

export default function Dropdown({ children, user }: Props) {
  const pathname = usePathname();
  const [isLogout, startLogout] = useTransition();

  const handleLogout = () => {
    startLogout(async () => {
      const tokenValid = await isTokenValid();
      console.log("toke is valie", tokenValid);
      if (tokenValid?.isSuccess) {
        deleteCookie("token");
        deleteCookie("refresh-token");
        window.location.href = "/login";
      }
    });
  };

  const userProtectedLinks = userAvatarNavlinks.protected;
  //   const userProtectedLinks = userAvatarNavlinks.protected.filter((link) =>
  //   link.roles.includes(currentUserRole[0])
  // );

  console.log(user?.isSuccess);
  const userPublicLinks = userAvatarNavlinks.public;
  const isUserLinksProtectedOrPublic = user?.isSuccess
    ? userProtectedLinks
    : userPublicLinks;

  const dropDownLinks = isUserLinksProtectedOrPublic?.map((link) =>
    pathname !== link?.href ? (
      <Link
        href={link?.href}
        className={` bg-white hover:bg-gray-100 duration-150 text-gray-700 w-full text-sm sm:text-base font-normal p-1 cursor-pointer rounded`}
        key={link?.title}
      >
        {link?.title}
      </Link>
    ) : null
  );

  const userDataContainer = (
    <div className="mb- flex items-start gap-1 w-full bg-gray-200 rounded p-1">
      <div className="flex-1">
        <p className="capitalize text-sm text-gray-600 font-semibold">
          {user?.data?.fullName}
        </p>
        <p className="capitalize text-xs text-gray-600">
          {user?.data?.userName}
        </p>
        <Badge variant="warning">{user?.data?.roles?.[0] ?? "N/A"}</Badge>
      </div>
      <>
        {user?.data?.userName && (
          <Button
            size="xs"
            variant="danger"
            onClick={handleLogout}
            disabled={isLogout}
          >
            {!isLogout ? (
              <LogOut size={18} />
            ) : (
              <Loader size={18} className="animate-spin" />
            )}
          </Button>
        )}
      </>
    </div>
  );
  const userDataContainerIsEmpty = (
    <div className="mb- flex items-start gap-1 w-full bg-gray-200 rounded p-1">
      <div className="flex-1">
        <p className="capitalize text-sm text-gray-600">undefined</p>
        <p className="capitalize text-xs text-gray-600">undefined</p>
        <Badge variant="warning">{"N/A"}</Badge>
      </div>
      <>
        <Button
          size="xs"
          variant="danger"
          onClick={handleLogout}
          disabled={isLogout}
        >
          {!isLogout ? (
            <LogOut size={18} />
          ) : (
            <Loader size={18} className="animate-spin" />
          )}
        </Button>
      </>
    </div>
  );

  const userDataContainerIsError = (
    <div className="mb- flex items-start gap-1 w-full bg-red-200 rounded p-1">
      <div className="flex-1">
        <p className="text-sm text-red-600">Faild to your name!</p>
        <p className="text-xs text-red-600">Report issue</p>
        <Badge variant="danger">N/A</Badge>
      </div>
      <>
        <Button
          size="xs"
          variant="danger"
          onClick={handleLogout}
          disabled={isLogout}
        >
          {!isLogout ? (
            <LogOut size={18} />
          ) : (
            <Loader size={18} className="animate-spin" />
          )}
        </Button>
      </>
    </div>
  );

  let content;
  if (user?.isSuccess) {
    content = userDataContainer;
  }
  if (user?.isEmpty) {
    content = userDataContainerIsEmpty;
  }
  if (user?.isError) {
    content = '';
  }
  // if (user?.isError) {
  //   content = "";
  // }
  console.log(user?.isError, user?.isAuth)

  const finalContent = (
    <div className="z-10 absolute shadow-xl shadow-gray-200 right-6 top-[calc(100%+10px)] bg-white border border-gray-300 rounded-md p-1 flex flex-col flex-wrap items-start justify-start gap-2 min-w-[150px] md:min-w-[200px]">
      {content}
      {dropDownLinks}
    </div>
  );

  return <>{finalContent}</>;
}
