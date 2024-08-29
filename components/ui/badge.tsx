import React from "react";

type Props = {
  children?: React.ReactNode;
  title?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  bg?: string;
  color?: string;
};

export default function Badge(props: Props) {
  // let { title, size } = props;
  const sizes = {
    xs: "text-xs rounded px-1 py-px",
    sm: "text-sm rounded px-1 py-px",
    md: "text-md rounded px-1 py-px",
    lg: "text-lg rounded px-1 py-px",
    xl: "text-xl rounded px-1 py-px",
  };

  const title =
    props?.title || props.children || "Hey DEV😑, where is my title?";
  const size = sizes[props?.size || "sm"];
  const bg = props?.bg || "bg-blue-200";
  const color = props?.color || "text-blue-600";

  const settings = `${size} ${bg} ${color}`;

  return <span className={`${settings}`}>{title}</span>;
}
