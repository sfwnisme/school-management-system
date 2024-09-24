"use client";
import React, { PropsWithChildren, PropsWithRef } from "react";

type Props = {
  children?: string;
  className?: string;
  title?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "initial" | "success" | "warning" | "danger" | "info";
};

export default function Badge(props: Props) {
  const sizes = {
    xs: "text-xs px-1",
    sm: "text-sm px-1",
    md: "text-md px-1",
    lg: "text-lg px-1",
    xl: "text-xl px-1",
  };
  const variants = {
    initial: "bg-gray-300 text-gray-700 outline-gray-300/80",
    success: "bg-green-300 text-green-700 outline-green-300/80",
    warning: "bg-yellow-300 text-yellow-700 outline-yellow-300/80",
    danger: "bg-red-300 text-red-700 outline-red-300/80",
    info: "bg-blue-300 text-blue-700 outline-blue-300/80",
  };

  const sfwndotme = (
    <a href="https://sfwn.me" className="">
      sfwn.me
    </a>
  );
  const title = props?.title || props.children || sfwndotme;
  const size = sizes[props?.size || "sm"];
  const variant = variants[props?.variant || "initial"];
  const settings = `${size} ${variant}`;

  return (
    <span
      className={`${settings} ${props?.className} rounded-[2.5px] cursor-default`}
    >
      {title}
    </span>
  );
}
