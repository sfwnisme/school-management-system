"use client";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  variant?: "initial" | "success" | "warning" | "danger" | "info";
};

export default function Message({
  children = "",
  variant = "initial",
  className = "",
}: Props) {
  const variants = {
    initial: "text-gray-500",
    success: "text-green-500",
    warning: "text-yellow-500",
    danger: "text-red-500",
    info: "text-blue-500",
  };
  // const variant = variants[variant || "initial"];

  const settings = variants[variant];
  // const children = props.children = ''

  return (
    <small
      className={`${settings} ${className} text-xs`}
      dangerouslySetInnerHTML={{ __html: `${children}` }}
    ></small>
  );
}
