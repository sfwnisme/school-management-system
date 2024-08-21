import React from "react";

export default function layout({ children }) {
  return (
    <div className="flex items-center justify-center h-full">{children}</div>
  );
}
