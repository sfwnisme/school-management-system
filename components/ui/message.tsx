'use client'
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  variant?: "initial" | "success" | "warning" | "danger" | "info";
};

export default function Message(props: Props) {
  const variants = {
    initial: "text-gray-500",
    success: "text-green-500",
    warning: "text-yellow-500",
    danger: "text-red-500",
    info: "text-blue-500",
  };
  const variant = variants[props?.variant || "initial"];

  const settings = `${variant}`;

  return (
    <small className={`${settings} ${props?.className || ""} text-xs`}>
      {props?.children}
      <span className="invisible">this for the height</span>
    </small>
  );
}
