type Props = {
  size?: "initial" | "xs" | "sm" | "md" | "lg";
  variant?:
    | "initial"
    | "outline"
    | "success"
    | "outline-success"
    | "warning"
    | "outline-warning"
    | "danger"
    | "outline-danger"
    | "info"
    | "outline-info";
  width?: "initial" | "full";
  rounded?: "none" | "initial" | "sm" | "md" | "lg" | "xl" | "full";
  loading?: number;
};

import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export default function Button(
  props: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > &
    Props
) {
  const sizes = {
    initial: "text-base md:text-base py-2 px-6",
    xs: "text-xs p-2",
    sm: "text-sm py-2 px-4",
    md: "text-base py-2 px-6",
    lg: "text-lg py-3 px-7",
  };

  const variants = {
    initial:
      "hover:bg-gray-900 bg-gray-800 text-white disabled:bg-gray-500 disabled:cursor-not-allowed",
    outline:
      "hover:bg-gray-900 bg-transparent border border-gray-900 text-gray-900 hover:text-white disabled:bg-gray-500 disabled:cursor-not-allowed",
    success:
      "hover:bg-green-600 bg-green-500 text-white disabled:bg-green-300 disabled:cursor-not-allowed",
    "outline-success":
      "hover:bg-green-600 bg-transparent border border-green-500 text-green-600 hover:text-white disabled:bg-green-300 disabled:cursor-not-allowed",
    warning:
      "hover:bg-yellow-600 bg-yellow-500 text-white disabled:bg-yellow-300 disabled:cursor-not-allowed",
    "outline-warning":
      "hover:bg-yellow-600 bg-transparent border border-yellow-500 text-yellow-600 hover:text-white disabled:bg-yellow-300 disabled:cursor-not-allowed",
    danger:
      "hover:bg-red-600 bg-red-500 text-white disabled:bg-red-300 disabled:cursor-not-allowed",
    "outline-danger":
      "hover:bg-red-600 bg-transparent border border-red-500 text-red-600 hover:text-white disabled:bg-red-300 disabled:cursor-not-allowed",
    info: "hover:bg-blue-600 bg-blue-500 text-white disabled:bg-blue-300 disabled:cursor-not-allowed",
    "outline-info":
      "hover:bg-blue-600 bg-transparent border border-blue-500 text-blue-600 hover:text-white disabled:bg-blue-300 disabled:cursor-not-allowed",
  };

  const width = {
    initial: "table",
    full: "w-full",
  };

  const rounds = {
    none: "rounded-none",
    initial: "rounded",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  };

  const currentWidth = width[props?.width || "initial"];

  // it will dynamically set the current variant of the button
  // if the variant prop is undefined it will set "initial" variant
  const currentVariant = variants[props?.variant || "initial"];

  // it will dynamically set the current size of the button
  // if the size prop is undefined it will set "initial" size
  const currentSize = sizes[props?.size || "initial"];

  const rounded = rounds[props?.rounded || "initial"];

  const settings = `${
    currentWidth + " " + currentVariant + " " + currentSize + " " + rounded
  }`;

  // the loading depends on disabled
  const loading = (
    <span className="relative flex h-3 w-3">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/50 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
    </span>
  );

  // const Tag = props?.href ? Link : "button";

  return (
    <button
      {...props}
      className={`col-span-full col-start-1 first-letter:capitalize 
        ${settings}
        duration-150
        flex items-center justify-center
        relative
        `}
    >
      <div
        className={`CLONE-OF-ELEMENT-VALUE-TO-SAVE-THE-ASPECTS invisible flex items-center gap-x-2`}
      >
        {props?.children || props?.value}
      </div>
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
      flex items-center gap-x-2
      ${props?.className}
     `}
      >
        {props.loading === 1 ? loading : props?.children || props?.value}
      </div>
    </button>
  );
}

/**Notes
 * you'll notice that I added an invisible losy <div>{props?.value}</div>
 * its duty to save the height of the current button only
 * also I added the loading status and the button value in
 * an absoluted div to center the content of the button
 *
 * No need for the status props all that handled by the props?.disabled
 *
 * What this component offers
 * use it as a button or Link
 * customized with variants, sizes, loading, and width
 * you can add the value as a props?.children or props?.value
 * The size will not interrupt if you change for loading😉
 */
