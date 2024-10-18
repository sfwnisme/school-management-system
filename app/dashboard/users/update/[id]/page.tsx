import NotFound from "@/app/not-found";
import Button from "@/components/ui/button";
import Title from "@/components/ui/title";
import UserResetPasswordForm from "../user-reset-password-form";
import UserUpdateForm from "../user-update-form";
import { IClientResponse, IRole, IUser } from "@/definitions";
import { getAllRoles, getUserById } from "@/lib/actions";
import React from "react";

// export const revalidate = 2;
type Props = {
  params: {
    id: string;
  };
};

export default async function page(props: Props) {
  const id = Number(props?.params.id);
  const userById = (await getUserById(id)) as IClientResponse<IUser>;
  const allRoles = (await getAllRoles()) as IClientResponse<IRole[]>;

  console.log(userById);

  if (!userById?.data || userById?.isError) return NotFound();
  return (
    <div>
      <Title title="Update User">
        <Button href="/dashboard/users" value="Users" />
      </Title>
      <UserUpdateForm user={userById} roles={allRoles} />
      <br />
      <UserResetPasswordForm user={userById} />
    </div>
  );
}
