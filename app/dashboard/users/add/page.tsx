import Button from "@/components/ui/button";
import Title from "@/components/ui/title";
import UserCreateForm from "./user-create-form";
import React from "react";

export default function page() {
  return (
    <div>
      <Title title="Add User">
        <Button href="/dashboard/users">
          Users
        </Button>
      </Title>
      <UserCreateForm />
    </div>
  );
}
