type Props = {
  size?: "initial" | "xs" | "sm" | "md" | "lg";
  variant?: "initial" | "success" | "warning" | "danger" | "info";
  outline?: boolean;
  width?: "initial" | "full";
  rounded?: "none" | "initial" | "sm" | "md" | "lg" | "xl" | "full";
  loading?: boolean;
  href?: string;
  tag?: "button" | "link";
  value?: string;
};

import { Loader, Loader2 } from "lucide-react";
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  LinkHTMLAttributes,
} from "react";
import Link from "next/link";

type ButtonTypes = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type LinkType = DetailedHTMLProps<
  LinkHTMLAttributes<HTMLLinkElement>,
  HTMLLinkElement
>;

type ButtonOrLink = ButtonTypes | LinkType;

export default function Button({
  size = "initial",
  variant = "initial",
  outline = false,
  width = "initial",
  rounded = "initial",
  loading = false,
  value,
  className,
  children,
  href = "/",
  tag = "button",
  ...rest
}: ButtonOrLink & Props) {
  const sizes = {
    initial: "text-base md:text-base py-2 px-6",
    xs: "text-xs p-1",
    sm: "text-sm py-2 px-4",
    md: "text-base py-2 px-6",
    lg: "text-lg py-3 px-7",
  };

  const variants = {
    initial:
      "hover:bg-gray-900 bg-gray-800 text-white disabled:opacity-[0.5] disabled:cursor-not-allowed",
    success:
      "hover:bg-green-600 bg-green-500 text-white disabled:opacity-[0.5] disabled:cursor-not-allowed",
    warning:
      "hover:bg-yellow-600 bg-yellow-500 text-white disabled:opacity-[0.5] disabled:cursor-not-allowed",
    danger:
      "hover:bg-red-600 bg-red-500 text-white disabled:opacity-[0.5] disabled:cursor-not-allowed",
    info: "hover:bg-blue-600 bg-blue-500 text-white disabled:opacity-[0.5] disabled:cursor-not-allowed",
  };
  const outlines = {
    initial:
      "hover:bg-gray-200 bg-gray-50 outline outline-gray-300 text-gray-500 hover:text-gray-600 disabled:opacity-[0.5] disabled:cursor-not-allowed",
    success:
      "hover:bg-green-200 bg-green-50 outline outline-green-300 text-green-500 hover:text-green-600 disabled:opacity-[0.5] disabled:cursor-not-allowed",
    warning:
      "hover:bg-yellow-200 bg-yellow-50 outline outline-yellow-300 text-yellow-500 hover:text-yellow-600 disabled:opacity-[0.5] disabled:cursor-not-allowed",
    danger:
      "hover:bg-red-200 bg-red-50 outline outline-red-300 text-red-500 hover:text-red-600  disabled:opacity-[0.5] disabled:cursor-not-allowed",
    info: "hover:bg-blue-200 bg-blue-50 outline outline-blue-300 text-blue-500 hover:text-blue-600 disabled:opacity-[0.5] disabled:cursor-not-allowed",
  };

  const widths = {
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

  const currentWidth = widths[width];

  // it will dynamically set the current variant of the button
  // if the variant prop is undefined it will set "initial" variant
  const variantsContainer = outline ? outlines[variant] : variants[variant];
  const currentVariant = variantsContainer;

  // it will dynamically set the current size of the button
  // if the size prop is undefined it will set "initial" size
  const currentSize = sizes[size];

  const currentRounded = rounds[rounded];

  const settings = `${
    currentWidth +
    " " +
    currentVariant +
    " " +
    currentSize +
    " " +
    currentRounded
  }`;

  const loadingJsx = (
    <span className="relative flex h-5 w-5">
      <Loader className="animate-spin absolute inline-flex h-full w-full rounded-full opacity-75" />
    </span>
  );

  const Tag = tag === "button" ? "button" : Link;
  const hasHref = href ? { href } : {};

  return (
    <Tag
      {...hasHref}
      {...rest}
      className={`col-span-full col-start-1 first-letter:capitalize 
        ${settings}
        duration-150
        flex items-center justify-center
        relative
        outline-1
        `}
    >
      <div
        className={`CLONE-OF-ELEMENT-VALUE-TO-SAVE-THE-ASPECTS invisible flex items-center gap-x-2`}
      >
        {children || value}
      </div>
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
      flex items-center gap-x-1
      ${className}
     `}
      >
        {/* {loading} */}
        {loading && loadingJsx}

        {children || value}
      </div>
    </Tag>
  );
}

/**Notes
 * you'll notice that I added an invisible losy <div>{value}</div>
 * its duty to save the height of the current button only
 * also I added the loading status and the button value in
 * an absoluted div to center the content of the button
 *
 * No need for the status props all that handled by the disabled
 *
 * What this component offers
 * use it as a button or Link
 * customized with variants, sizes, loading, and width
 * you can add the value as a children or value
 * The size will not interrupt if you change for loading😉
 */
