import Nav from "@/components/ui/nav";
import { getCurrentUser } from "@/lib/actions";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default async function layout({ children }: Props) {
  const user = await getCurrentUser();
  const userDetails = {
    username: user?.data.data.userName,
    name: user?.data.data.fullName,
    image: user?.data.data.imagePath,
  };
  return (
    <div>
      <Nav isDashboard={false} userDetails={userDetails} />
      <div className="container mx-auto">{children}</div>
    </div>
  );
}
