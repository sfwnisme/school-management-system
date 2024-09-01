import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function ErrorMessage(props: Props) {
  return (
    <small className={`text-xs text-red-500 ${props?.className}`}>
      {props?.children}
      <span className="invisible">sfkj</span>
    </small>
  );
}
