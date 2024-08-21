import Nav from "@/components/ui/nav";
import React from "react";

type Props = {};

export default function layout({ children }: childrenType) {
  return (
    <div>
      <Nav isDashboard={false} />

      <div className="container mx-auto">{children}</div>
    </div>
  );
}
