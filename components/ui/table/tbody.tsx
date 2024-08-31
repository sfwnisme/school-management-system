import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function Tbody(props: Props) {
  return <tbody className="divide-y divide-gray-200">{props?.children}</tbody>;
}
