import Button from "@/components/ui/button";
import Title from "@/components/ui/title";
import UsersTable from "@/components/ui/users/users-table";
import { getAllUsers, getCurrentUser } from "@/lib/actions";

export default async function page() {
  const [users, currentUser] = await Promise.all([
    getAllUsers(),
    getCurrentUser(),
  ]);

  return (
    <div className="relative">
      <Title title="All Users">
        <Button tag="link" href="/dashboard/users/add">
          Add User
        </Button>
      </Title>
      <UsersTable users={users} currentUser={currentUser} />
    </div>
  );
}
