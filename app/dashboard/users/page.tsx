import Button from "@/components/ui/button";
import TableLayer from "@/components/ui/table/table-layer";
import Title from "@/components/ui/title";
import { IClientResponse, IUser } from "@/definitions";
import { deleteUser, getAllUsers, getCurrentUser } from "@/lib/actions";

export default async function page() {
  const [users, currentUser] = await Promise.all([
    getAllUsers(),
    getCurrentUser(),
  ]);

  const userKeysAndNames = [
    {
      key: "id",
      name: "id",
    },
    {
      key: "imagePath",
      name: "image",
    },
    {
      key: "fullName",
      name: "name",
    },
    {
      key: "userName",
      name: "user name",
    },
    {
      key: "email",
      name: "email",
    },
    {
      key: "roles",
      name: "role",
    },
  ];

  return (
    <div className="relative">
      <Title title="All Users">
        <Button href="/dashboard/users/add">
          Create
        </Button>
      </Title>
      <TableLayer
        dataFunction={users}
        deleteFunction={deleteUser}
        tableHeader={userKeysAndNames}
        currentUser={currentUser as IClientResponse<IUser>}
        route={"users"}
      />
    </div>
  );
}
