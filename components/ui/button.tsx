import { Loader } from "lucide-react";
import Link from "next/link";
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type ButtonProps = {
  size?: "initial" | "xs" | "sm" | "md" | "lg";
  variant?: "initial" | "success" | "warning" | "danger" | "info" | "link";
  outline?: boolean;
  width?: "initial" | "full";
  rounded?: "none" | "initial" | "sm" | "md" | "lg" | "xl" | "full";
  loading?: boolean;
  loadingText?: string;
  value?: string;
  className?: string;
  children?: React.ReactNode;
  href?: string; // Optional href to distinguish between button and link
  tag?: keyof React.ReactHTML;
  disabled?: boolean;
};

// Button-specific props
type ButtonSpecificProps = ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps;

// Link-specific props
type LinkSpecificProps = AnchorHTMLAttributes<HTMLAnchorElement> & ButtonProps;

type ButtonOrLinkProps = ButtonSpecificProps | LinkSpecificProps;

export default function Button({
  size = "initial",
  variant = "initial",
  outline = false,
  width = "initial",
  rounded = "initial",
  loading = false,
  loadingText = "",
  value,
  className,
  children,
  href,
  tag = "button",
  ...rest
}: ButtonOrLinkProps) {
  const sizes = {
    initial: "text-base md:text-base py-2 px-6",
    xs: "text-xs p-1",
    sm: "text-xs md:text-sm py-1 px-2 md:py-2 md:px-4",
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
    link: "hover:text-blue-600 text-blue-500 disabled:opacity-[0.5] disabled:cursor-not-allowed underlined",
  };

  const outlines = {
    initial:
      "hover:bg-gray-200 bg-gray-50 outline outline-1 outline-gray-300 text-gray-500 hover:text-gray-600 disabled:opacity-[0.5] disabled:cursor-not-allowed",
    success:
      "hover:bg-green-200 bg-green-50 outline outline-1 outline-green-300 text-green-500 hover:text-green-600 disabled:opacity-[0.5] disabled:cursor-not-allowed",
    warning:
      "hover:bg-yellow-200 bg-yellow-50 outline outline-1 outline-yellow-300 text-yellow-500 hover:text-yellow-600 disabled:opacity-[0.5] disabled:cursor-not-allowed",
    danger:
      "hover:bg-red-200 bg-red-50 outline outline-1 outline-red-300 text-red-500 hover:text-red-600  disabled:opacity-[0.5] disabled:cursor-not-allowed",
    info: "hover:bg-blue-200 bg-blue-50 outline outline-1 outline-blue-300 text-blue-500 hover:text-blue-600 disabled:opacity-[0.5] disabled:cursor-not-allowed",
    link: "hover:text-blue-600 text-blue-500 disabled:opacity-[0.5] disabled:cursor-not-allowed underlined",
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
  const currentVariant = outline ? outlines[variant] : variants[variant];
  const currentSize = sizes[size];
  const currentRounded = rounds[rounded];

  const settings = `${currentWidth} ${currentVariant} ${currentSize} ${currentRounded}`;

  const loadingJsx = (
    <span className="relative flex h-5 w-5">
      <Loader className="animate-spin absolute inline-flex h-full w-full rounded-full opacity-75" />
    </span>
  );

  // If href is provided, render an anchor element (link)
  if (href) {
    return (
      <Link href={href} {...(rest as LinkSpecificProps)} className={`${settings} ${className || ''} !flex items-center justify-center`}>
        {loading ? loadingJsx : children || value}
      </Link>
    );
  }

  // Otherwise, render a button element
  return (
    <button
      {...(rest as ButtonSpecificProps)}
      className={`${settings} ${className || ''} !flex items-center justify-center`}
      disabled={rest.disabled || loading}
    >
      {loading ? loadingJsx : children || value}
    </button>
  );
}
