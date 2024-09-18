import Input from "@/components/ui/input";
import Title from "@/components/ui/title";
import UserForm from "@/components/ui/users/user-update-form";
import { getAllRoles, getRolesByUserId, getUserById } from "@/lib/actions";
import React from "react";

// export const revalidate = 2;
type Props = {
  params: {
    id: string;
  };
};

const updateUserDataSchema = {
  id: 31,
  userName: "ali",
  email: "ali@project.com",
  imagePath: null,
  fullName: "ali mo",
};
// const dfkj = {

//   "id": 31,
//   "userName": "ali",
//   "email": "ali@project.com",
//   "imagePath": null,
//   "fullName": "ali mo",
// }

export default async function page(props: Props) {
  const id = Number(props?.params.id);

  // user by id
  const userById = await getUserById(id);
  const userData = userById?.data.data;

  // all roles
  const allRoles = await getAllRoles();
  const allRolesData = allRoles?.data.data;
  console.log(allRolesData);

  // user roles
  const userRoles = await getRolesByUserId(id);
  const userRolesData = userRoles?.data.data;
  console.log(userRolesData);

  console.log(userData);
  return (
    <div>
      <Title>Update User</Title>
      <UserForm
        user={userData}
        roles={allRolesData}
        userRoles={userRolesData}
      />
    </div>
  );
}
