import Title from "@/components/ui/title";
import React from "react";
type Props = {
  children: React.ReactNode;
};
export default function layout({ children }: Props) {
  return <div>{children}</div>;
}
