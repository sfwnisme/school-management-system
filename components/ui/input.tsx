import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";

type Props = {
  styles?: string;
  variant?: "initial" | "success" | "danger";
  sze?: "initial" | "sm" | "lg";
};

export default function Input(
  props: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > &
    Props
) {
  const variants = {
    initial: "border-gray-500 outline-gray-200",
    success: "border-green-700 outline-green-200 ",
    danger: "border-red-700 outline-red-200 ",
  };

  const sizes = {
    initial: "text-xs px-4 py-2 min-h-[40px] w-full",
    sm: "text-xs px-4 py-1 min-h-[30px] w-full",
    lg: "text-sm px-4 p-2 min-h-[50px] w-full",
  };

  const focusVisible = "focus-visible:outline outline-[3px] outline-gray-200";

  const currentStatus = variants[props?.variant || "initial"];

  const currentSize = sizes[props?.sze || "initial"];

  return (
    <input
      {...props}
      className={` bg-transparent border rounded text-black col-span-full w-full ${currentSize} ${currentStatus} ${focusVisible} ${props?.styles}`}
    />
  );
}

/**NOTES
 * I named it sze instead of size becuase typescript said it's booked term
 */
