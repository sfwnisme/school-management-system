// "use client";
import Drawer from "@/components/dashboard-layout/drawer";
import IsAuth from "@/lib/is-auth";
import React, { Suspense } from "react";
import Loading from "../../components/ui/spin-loading";

export default function layout({ children }: childrenType) {
  // const instructors = await getAllInstructors();

  // console.log(instructors);

  return (
    <div>
      <IsAuth>
        <Drawer>{children}</Drawer>
      </IsAuth>
      {/* <Sidebar>{children}</Sidebar> */}
    </div>
  );
}
