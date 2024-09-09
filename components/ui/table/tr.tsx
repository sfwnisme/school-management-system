import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Tr(props: Props) {
  return <tr className={`divide-x divide-gray-200 ${props?.className}`}>{props?.children}</tr>;
}
