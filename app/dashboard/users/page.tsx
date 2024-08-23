// "use client";

import UsersTable from "@/components/ui/users/users-table";
import { getAllUsers } from "@/lib/actions";

export default function page() {
  // let users = await getAllUsers();
  // users = users?.data?.data;
  // console.log("user from users component", users);

  return (
    <div>
      users component
      <UsersTable />
    </div>
  );
}
