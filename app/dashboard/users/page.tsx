// "use client";

import Title from "@/components/ui/title";
import UsersTable from "@/components/ui/users/users-table";

export default function page() {
  return (
    <div>
      <Title>Users</Title>
      <UsersTable />
    </div>
  );
}
