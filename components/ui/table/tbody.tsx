import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Tbody(props: Props) {
  return (
    <tbody className={`divide-y divide-gray-200 ${props?.className}`}>
      {props?.children}
    </tbody>
  );
}
