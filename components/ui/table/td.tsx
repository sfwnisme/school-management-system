import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Td(props: Props) {
  return (
    <td
      className={`py-1 md:py-2 px-2 md:px-4 whitespace-nowrap text-xs md:text-sm text-gray-500 ${props?.className}`}
    >
      {props?.children}
    </td>
  );
}
