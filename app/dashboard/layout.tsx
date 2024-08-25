import Drawer from "@/components/dashboard-layout/drawer";
import IsAuth from "@/lib/is-auth";
import Loading from "../../components/ui/spin-loading";

export default function layout({ children }: childrenType) {
  return (
    <div>
      <IsAuth>
        <Drawer>{children}</Drawer>
      </IsAuth>
    </div>
  );
}
