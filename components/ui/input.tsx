import React from "react";

type InputType =
  | "text"
  | "password"
  | "email"
  | "number"
  | "checkbox"
  | "radio"
  | "file"
  | "date"
  | "tel"
  | "url"
  | "color"
  | "search"
  | "range"
  | "hidden"
  | "reset"
  | "submit"
  | "button";

type InputValue = string | number | readonly string[];

type Props = {
  type: InputType;
  name: string;
  placeholder?: string;
  value?: InputValue;
  styles?: string;
  status?: "idle" | "success" | "error";
};

export default function Input(props: Props) {
  let { status } = props;
  status = status || "idle";
  const statusObj = {
    idle: "border-gray-500",
    success: "outline outline-[3px] outline-green-200 border-green-700",
    error: "outline outline-[3px] outline-red-200 border-red-700",
  };
  const focusVisible = "focus-visible:outline outline-[3px] outline-gray-200";

  const statusStyle = statusObj[status];

  return (
    <input
      {...props}
      className={`${focusVisible} ${props?.styles} bg-transparent text-xs border ${statusStyle} rounded p-2  min-h-[40px] text-black col-span-full w-full`}
    />
  );
}
