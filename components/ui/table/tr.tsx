import { childrenType } from "@/definitions";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function Tr(props: Props) {
  return <tr className="divide-x divide-gray-200">{props?.children}</tr>;
}
