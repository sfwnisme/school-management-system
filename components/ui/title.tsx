import { childrenType } from "@/definitions";
import React from "react";

type Props = {};

export default function Title(props: childrenType) {
  return (
    <div className="mb-10">
      <h1 className="text-2xl md:text-3xl pl-2 mb-5 border-l-d4 font-sans font-bold border-gray-400  text-gray-700">
        {props?.children}
      </h1>
      <hr />
    </div>
  );
}
