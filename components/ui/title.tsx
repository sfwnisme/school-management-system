import React from "react";
import Button from "./button";

type Props = {
  children?: React.ReactNode;
  title: string;
};

export default function Title(props: Props) {
  return (
    <>
      <div className="flex items-center justify-between w-full">
        <h1 className="text-2xl md:text-3xl pl-2 mb-5 border-l-d4 font-sans font-bold border-gray-400 text-gray-700 flex items-center justify-between">
          {props?.title}
        </h1>
        {props.children && props.children}
      </div>
      <hr className="mb-10" />
    </>
  );
}
