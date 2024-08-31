import Drawer from "@/components/dashboard-layout/drawer";
import IsAuth from "@/lib/is-auth";
import Loading from "../../components/ui/spin-loading";
import { Suspense } from "react";
import { childrenType } from "@/definitions";

export default function layout({ children }: childrenType) {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <IsAuth>
          <Drawer>{children}</Drawer>
        </IsAuth>
      </Suspense>
    </div>
  );
}
