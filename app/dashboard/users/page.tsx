import Title from "@/components/ui/title";
import UsersData from "@/components/ui/users/users-data";
import UsersTable from "@/components/ui/users/users-table";

export default function page() {
  return (
    <div>
      <Title>Users</Title>
      <UsersTable/>
        {/* <UsersData /> */}
      {/* </UsersTable> */}
    </div>
  );
}
