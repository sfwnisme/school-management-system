import React from "react";

type Props = {};

export default function Title({ children }: childrenType) {
  return (
    <h1 className="text-2xl md:text-3xl pl-2 mb-10 border-l-4  font-sans font-bold border-gray-400  text-gray-700">
      {children}
    </h1>
  );
}
