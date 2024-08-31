import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function Thead(props: Props) {
  return <thead className="bg-gray-100">{props?.children}</thead>;
}
