"use client";
import { Loader, Loader2 } from "lucide-react";
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  LinkHTMLAttributes,
  ReactHTML,
} from "react";
import Link from "next/link";
import type { UrlObject } from "url";

type Props = {
  size?: "initial" | "xs" | "sm" | "md" | "lg";
  variant?: "initial" | "success" | "warning" | "danger" | "info" | "link";
  outline?: boolean;
  width?: "initial" | "full";
  rounded?: "none" | "initial" | "sm" | "md" | "lg" | "xl" | "full";
  loading?: boolean;
  loadingText?: string;
  href?: string;
  tag?: keyof ReactHTML;
  value?: string;
  className?: string;
  children?: React.ReactNode;
};

type Url = string | UrlObject;

type InternalLinkProps = {
  /**
   * The path or URL to navigate to. It can also be an object.
   *
   * @example https://nextjs.org/docs/api-reference/next/link#with-url-object
   */
  href: Url;
  /**
   * Optional decorator for the path that will be shown in the browser URL bar. Before Next.js 9.5.3 this was used for dynamic routes, check our [previous docs](https://github.com/vercel/next.js/blob/v9.5.2/docs/api-reference/next/link.md#dynamic-routes) to see how it worked. Note: when this path differs from the one provided in `href` the previous `href`/`as` behavior is used as shown in the [previous docs](https://github.com/vercel/next.js/blob/v9.5.2/docs/api-reference/next/link.md#dynamic-routes).
   */
  as?: Url;
  /**
   * Replace the current `history` state instead of adding a new url into the stack.
   *
   * @defaultValue `false`
   */
  replace?: boolean;
  /**
   * Whether to override the default scroll behavior
   *
   * @example https://nextjs.org/docs/api-reference/next/link#disable-scrolling-to-the-top-of-the-page
   *
   * @defaultValue `true`
   */
  scroll?: boolean;
  /**
   * Update the path of the current page without rerunning [`getStaticProps`](/docs/pages/building-your-application/data-fetching/get-static-props), [`getServerSideProps`](/docs/pages/building-your-application/data-fetching/get-server-side-props) or [`getInitialProps`](/docs/pages/api-reference/functions/get-initial-props).
   *
   * @defaultValue `false`
   */
  shallow?: boolean;
  /**
   * Forces `Link` to send the `href` property to its child.
   *
   * @defaultValue `false`
   */
  passHref?: boolean;
  /**
   * Prefetch the page in the background.
   * Any `<Link />` that is in the viewport (initially or through scroll) will be preloaded.
   * Prefetch can be disabled by passing `prefetch={false}`. When `prefetch` is set to `false`, prefetching will still occur on hover in pages router but not in app router. Pages using [Static Generation](/docs/basic-features/data-fetching/get-static-props.md) will preload `JSON` files with the data for faster page transitions. Prefetching is only enabled in production.
   *
   * @defaultValue `true`
   */
  prefetch?: boolean;
  /**
   * The active locale is automatically prepended. `locale` allows for providing a different locale.
   * When `false` `href` has to include the locale as the default behavior is disabled.
   */
  locale?: string | false;
  /**
   * Enable legacy link behavior.
   * @defaultValue `false`
   * @see https://github.com/vercel/next.js/commit/489e65ed98544e69b0afd7e0cfc3f9f6c2b803b7
   */
  legacyBehavior?: boolean;
  /**
   * Optional event handler for when the mouse pointer is moved onto Link
   */
  onMouseEnter?: React.MouseEventHandler<HTMLAnchorElement>;
  /**
   * Optional event handler for when Link is touched.
   */
  onTouchStart?: React.TouchEventHandler<HTMLAnchorElement>;
  /**
   * Optional event handler for when Link is clicked.
   */
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

type LinkPropsType = React.ForwardRefExoticComponent<
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof InternalLinkProps> &
    InternalLinkProps & {
      children?: React.ReactNode;
    } & React.RefAttributes<HTMLAnchorElement>
>;

type ButtonTypes = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type LinkType = DetailedHTMLProps<
  LinkHTMLAttributes<HTMLLinkElement>,
  HTMLLinkElement
>;

type ButtonWithProps = ButtonTypes & Props;
type LinkPropsTypeWithProps = LinkPropsType & Props;

type ButtonOrLink = ButtonWithProps | LinkPropsTypeWithProps;

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
  href = "/",
  tag = "button",
  ...rest
}: ButtonOrLink) {
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
    link: "hover:text-blue-600 text-blue-500 disabled:opacity-[0.5] disabled:cursor-not-allowed",
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
    link: "hover:text-blue-600 text-blue-500 disabled:opacity-[0.5] disabled:cursor-not-allowed",
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

  // const Tag = tag === "button" ? "button" : Link;
  const Tag = tag === "button" ? "button" : Link;
  // const Tag = tag ? Link : 'button';
  const hasHref = href ? { href } : {};

  return (
    <Tag
      {...hasHref}
      {...rest}
      className={`
        col-span-full col-start-1 first-letter:capitalize 
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
        {loading && loadingText !== "" ? loadingText : children || value}
      </div>
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
      flex items-center gap-x-1 w-full justify-center
      ${className}
     `}
      >
        {loading && loadingJsx}

        {loading && loadingText !== "" ? loadingText : children || value}
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
