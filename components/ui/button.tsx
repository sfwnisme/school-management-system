type Props = {
  // type: "button" | "reset" | "submit" | undefined;
  // value: string;
  // event: any;
  size?: "initial" | "xs" | "sm" | "md" | "lg";
  variant?: "initial" | "success" | "warning" | "danger" | "info";
};

import { Dot, Ellipsis, Loader } from "lucide-react";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export default function Button(
  props: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > &
    Props
) {
  // let { type, value, event } = props;
  // type = type || "submit";
  // value = value || "button";
  // event = event || '() => ""';
  // const { status }: { status: "idle" | "loading" | "error" | "success" } =
  //   props;
  // const loading = "";
  // const error = "";
  // const success = "";

  // status
  // const status = "idle" || "loading" || "disabled";
  const status = {};

  const sizes = {
    initial: "text-sm md:text-base p-2",
    xs: "text-xs p-1",
    sm: "text-sm p-1",
    md: "text-base p-2",
    lg: "text-lg md:text-base p-2",
  };

  const variants = {
    initial:
      "hover:bg-gray-900 bg-gray-800 text-white disabled:bg-gray-500 disabled:cursor-not-allowed",
    success:
      "hover:bg-green-600 bg-green-500 text-white disabled:bg-green-300 disabled:cursor-not-allowed",
    warning:
      "hover:bg-yellow-600 bg-yellow-500 text-white disabled:bg-yellow-300 disabled:cursor-not-allowed",
    danger:
      "hover:bg-red-600 bg-red-500 text-white disabled:bg-red-300 disabled:cursor-not-allowed",
    info: "hover:bg-blue-600 bg-blue-500 text-white disabled:bg-blue-300 disabled:cursor-not-allowed",
  };

  // it will dynamically set the current variant of the button
  // if the variant prop is undefined it will set "initial" variant
  const currentVariant = variants[props?.variant || "initial"];

  // it will dynamically set the current size of the button
  // if the size prop is undefined it will set "initial" size
  const currentSize = sizes[props?.size || "initial"];

  const isLoading = props?.disabled ? (
    <span className="relative flex h-3 w-3">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/50 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
    </span>
  ) : null;

  return (
    <button
      {...props}
      className={`w-full  col-span-full col-start-1 rounded first-letter:capitalize 
        ${currentSize} ${currentVariant}
        duration-150
        flex items-center justify-center
        relative
        `}
      // disabled
    >
      <div className={`invisible`}>{props?.value}</div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {isLoading || props?.value}
      </div>
      {/* <Loader className="animate-spin duration-700" /> */}
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
 */
