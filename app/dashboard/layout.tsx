import Drawer from "@/components/dashboard-layout/drawer";
import IsAuth from "@/lib/is-auth";
import Loading from "../../components/ui/spin-loading";
import { Suspense } from "react";
import DrawerContainer from "@/components/server-drawer/drawer-container";
type Props = {
  children: React.ReactNode;
};
export default function layout({ children }: Props) {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <IsAuth route="protected">
          <DrawerContainer>{children}</DrawerContainer>
        </IsAuth>
      </Suspense>
    </div>
  );
}
