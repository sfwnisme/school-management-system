import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Thead(props: Props) {
  return (
    <thead className={`bg-gray-100 ${props?.className}`}>
      {props?.children}
    </thead>
  );
}
