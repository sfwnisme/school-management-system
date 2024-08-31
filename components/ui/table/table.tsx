import React from "react";

type Props = {
  children: React.ReactNode;
  rounded?: "none" | "initial" | "sm" | "md" | "lg" | "xl";
};

export default function Table(props: Props) {
  const rounds = {
    none: "rounded-none",
    initial: "rounded",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
  };

  const rounded = rounds[props?.rounded || "none"];
  const settings = rounded;

  return (
    <div>
      <div
        className={`table-container min-w-full overflow-x-auto border ${settings}`}
      >
        <table className="w-full divide-y divide-gray-200">
          {props.children}
        </table>
      </div>
    </div>
  );
}
