"use client";
// import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";
import Badge from "../badge";
import { userAvatarNavlinks } from "@/lib/data";
import { usePathname } from "next/navigation";
import Button from "../button";
import { LogOut } from "lucide-react";
import { deleteCookie } from "cookies-next";
import { isTokenValid } from "@/lib/actions";
import { IMUser } from "@/definitions";

type Props = {
  children?: React.ReactNode;
  userDetails?: IMUser;
};

export default function Dropdown({ children, userDetails }: Props) {
  const pathname = usePathname();
  const currentUserRole = userDetails?.role || [];

  const handleLogout = async () => {
    const tokenValid = await isTokenValid();
    console.log(tokenValid);
    if (tokenValid === 200) {
      deleteCookie("token");
      deleteCookie("refresh-token");
      window.location.href = "/login";
    }
    return null;
  };

  const userProtectedLinks = userAvatarNavlinks.protected.filter((link) =>
    link.roles.includes(currentUserRole[0])
  );
  const userPublicLinks = userAvatarNavlinks.public;
  const user = userDetails?.name;
  const isUserLinksProtectedOrPublic = user
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

  const userDataContainer =
    userDetails?.name !== undefined ? (
      <div className="mb- flex items-start gap-1 w-full bg-gray-200 rounded p-1">
        <div className="flex-1">
          <p className="capitalize text-sm text-gray-600">
            {userDetails?.name}
          </p>
          <p className="capitalize text-xs text-gray-600">
            {userDetails?.username}
          </p>
          <Badge variant="warning">{"N/A"}</Badge>
        </div>
        <>
          {userDetails?.name && (
            <Button size="xs" variant="danger" onClick={handleLogout}>
              <LogOut size={18} />
            </Button>
          )}
        </>
      </div>
    ) : null;

  const content = (
    <div className="z-10 absolute shadow-xl shadow-gray-200 right-6 top-[calc(100%+10px)] bg-white border border-gray-300 rounded-md p-1 flex flex-col flex-wrap items-start justify-start gap-2 min-w-[150px] md:min-w-[200px]">
      {userDataContainer}
      {dropDownLinks}
    </div>
  );
  return <>{content}</>;
}
