"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import Badge from "./badge";

type Props = {
  children?: React.ReactNode;
  userDetails?: IUser;
  list: {
    title: string;
    href: string;
  }[];
};

export default function Dropdown(props: Props) {
  const list = props?.list || {
    protected: [
      {
        title: "string",
        href: "string",
      },
    ],
    public: [
      {
        title: "string",
        href: "string",
      },
    ],
  };

  const pathname = usePathname();

  const token = Cookies.get("token");
  const userList = list?.map((link) =>
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
  const userDetails = props?.userDetails?.fullName !== "" && (
    <div className="border-b pb-4 flex flex-wrap items-center gap-1 w-full">
      <p>{props?.userDetails?.fullName}</p>
      <Badge>{props?.userDetails?.roles?.[0]}</Badge>
    </div>
  );
  return (
    <>
      {userDetails}
      {userList}
      <>{props?.children}</>
    </>
  );
}
