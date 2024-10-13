import NotFound from "@/app/not-found";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Title from "@/components/ui/title";
import UserResetPasswordForm from "@/components/ui/users/user-reset-password-form";
import UserResetPassword from "@/components/ui/users/user-reset-password-form";
import UserUpdateForm from "@/components/ui/users/user-update-form";
import UserForm from "@/components/ui/users/user-update-form";
import { IClientResponse, IRole, ISubject, IUser } from "@/definitions";
import { getAllRoles, getRolesByUserId, getSubjectById } from "@/lib/actions";
import React from "react";
import SubjectUpdateForm from "../subject-update-form";

// export const revalidate = 2;
type Props = {
  params: {
    id: string;
  };
};

export default async function page(props: Props) {
  const id = Number(props?.params.id);
  const subjectById = await getSubjectById(id) as IClientResponse<ISubject>

  console.log(subjectById)

  if (!subjectById?.data || subjectById?.isError) return NotFound();
  return (
    <div>
      <Title title="Update User">
        <Button tag="link" href="/dashboard/users" value="Users" />
      </Title>
      <SubjectUpdateForm subject={subjectById} />
    </div>
  );
}
