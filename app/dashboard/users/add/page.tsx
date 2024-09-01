import CreateUserForm from "@/components/auth-components/create-user-form";
import Title from "@/components/ui/title";
import React from "react";

export default function page() {
  return (
    <div>
      <Title>Add user</Title>
      <CreateUserForm />
    </div>
  );
}
