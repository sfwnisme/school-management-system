import React from "react";
type Props = {
  width?: string;
  height?: string;
  color?: string;
  rounded?: "sm" | "md" | "lg" | "xl";
};

export default function Skeleton(props: Props) {
  const width = props.width || "w-full";
  const height = props.height || "h-4";
  const color = props.color || "bg-gray-200";
  const rounded = props.rounded || "rounded";

  const settings = ` ${color} ${rounded}`;

  return (
    <div className={`flex animate-none ${width} ${height}`}>
      <div className="w-full">
        <div className={`${settings} h-full w-full`}></div>
        {/* <div className="w-full h-4 bg-gray-200 rounded-sm dark:bg-neutral-700"></div> */}
      </div>
    </div>
  );
}
