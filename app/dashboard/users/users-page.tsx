"use client";
import Button from "@/components/ui/button";
import Title from "@/components/ui/title";
import AddUserPopup from "@/components/ui/users/add-user-popup";
import UsersTable from "@/components/ui/users/users-table";
import { IUser } from "@/definitions";
import React, { useState } from "react";

type Props = {
  users: IUser[];
  currentUser: IUser;
};

export default function UsersPage(props: Props) {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <div>
      <Title title="All Users">
        <Button onClick={handleToggle}>Add User</Button>
      </Title>
      <AddUserPopup toggle={toggle} setToggle={setToggle} />
      <UsersTable users={props.users} currentUser={props.currentUser} />
    </div>
  );
}
