// "use client";
import Sidebar from "@/components/dashboard-layout/dashboard-layout";
import Drawer from "@/components/dashboard-layout/drawer";
import { getAllInstructors } from "@/lib/actions";
import React from "react";

export default function layout({ children }: childrenType) {
  // const instructors = await getAllInstructors();

  // console.log(instructors);

  return (
    <div>
      <Drawer>{children}</Drawer>
      {/* <Sidebar>{children}</Sidebar> */}
    </div>
  );
}
