import IsAuth from "@/lib/is-auth";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function layout({ children }: Props) {
  return (
    <>
      <IsAuth route="public">{children}</IsAuth>
    </>
  );
}
