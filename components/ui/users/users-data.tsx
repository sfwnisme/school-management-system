import Button from "../button";
import { Edit, Trash } from "lucide-react";
import { getAllUsers } from "@/lib/actions";
import { Suspense } from "react";
import Loading from "../spin-loading";
import Tr from "../table/tr";
import Td from "../table/td";
import { IUser } from "@/definitions";

export default async function UsersData() {
  const users = await getAllUsers();

  console.log(users?.data.data);
  // id: 7,
  //     email: 'ae@gmail.com',
  //     fullName: 'Ahmed mohamed',
  //     address: null,
  //     createdAt: '0001-01-01T00:00:00',
  //     lastUpdate: null,
  //     dateOfBirth: null,
  //     gender: '',
  //     phoneNumber: '01150054195',
  //     roles: [ 'User' ]

  const data = users?.data.data.map((user: IUser) => (
    <Tr key={user?.id}>
      <Td>{user?.id}</Td>
      <Td>{user?.fullName}</Td>
      <Td>{...[user.roles?.join(" / ") || "no"]}</Td>
      <Td>{user?.email}</Td>
      <Td>{!user?.address && "no address"}</Td>
      <Td>{user?.phoneNumber}</Td>
      <Td className=" flex gap-1 md:gap-2 py-2 px-4 whitespace-nowrap text-sm font-medium text-gray-500 ">
        <Button size="xs" variant="info" width="fit">
          <Edit size={15} />
        </Button>
        <Button size="xs" variant="danger" width="fit">
          <Trash size={15} />
        </Button>
      </Td>
    </Tr>
  ));
  return <>{data}</>;
}
