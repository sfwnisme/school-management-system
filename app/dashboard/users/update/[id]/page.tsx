import NotFound from "@/app/not-found";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Title from "@/components/ui/title";
import UserResetPasswordForm from "@/components/ui/users/user-reset-password-form";
import UserResetPassword from "@/components/ui/users/user-reset-password-form";
import UserForm from "@/components/ui/users/user-update-form";
import { IUser } from "@/definitions";
import { getAllRoles, getRolesByUserId, getUserById } from "@/lib/actions";
import React from "react";

// export const revalidate = 2;
type Props = {
  params: {
    id: string;
  };
};

export default async function page(props: Props) {
  const id = Number(props?.params.id);

  const userById = await getUserById(id);
  const userData = userById?.data;
  console.log(userById);

  // all roles
  const allRoles = await getAllRoles();
  const allRolesData = allRoles?.data.data;
  console.log(allRolesData);

  // user roles
  const userRoles = await getRolesByUserId(id);
  const userRolesData = userRoles?.data.data;
  console.log(userRolesData);

  if (!userById?.data || userById?.status === "error") return NotFound();
  console.log(userData);
  return (
    <div>
      <Title title="Update User">
        <Button tag="link" href="/dashboard/users" value="Users" />
      </Title>
      <UserForm
        user={userData ?? ({} as IUser)}
        roles={allRolesData}
        userRoles={userRolesData}
      />
      <br />
      <UserResetPasswordForm user={userData ?? ({} as IUser)} />
    </div>
  );
}
