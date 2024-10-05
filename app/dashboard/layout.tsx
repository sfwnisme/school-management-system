import Drawer from "@/components/dashboard-layout/drawer";
import IsAuth from "@/lib/is-auth";
import DrawerContainer from "@/components/server-drawer/drawer-container";
import IsRoleAuth from "@/lib/is-role-auth";
type Props = {
  children: React.ReactNode;
};
export default function layout({ children }: Props) {
  return (
    <div>
      {/* <Suspense fallback={<Loading />}> */}
      <IsAuth route="protected">
        <IsRoleAuth>
          <DrawerContainer>{children}</DrawerContainer>
        </IsRoleAuth>
      </IsAuth>
      {/* </Suspense> */}
    </div>
  );
}
