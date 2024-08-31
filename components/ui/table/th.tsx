import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function Th(props: Props) {
  return (
    <th className="p-4 text-start text-xs md:text-sm font-bold text-gray-900 uppercase ">
      {props?.children}
    </th>
  );
}
