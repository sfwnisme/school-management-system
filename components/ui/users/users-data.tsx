import Button from "../button-with-link";
import { Edit, Trash } from "lucide-react";
import { getAllUsers } from "@/lib/actions";
import { Suspense } from "react";
import Loading from "../spin-loading";

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
    <tr key={user?.id} className="divide-x">
      <td className="py-2 px-4 whitespace-nowrap text-sm font-medium text-gray-500 ">
        {user?.id}
      </td>
      <td className="py-2 px-4 whitespace-nowrap text-sm font-medium text-gray-500 ">
        {user?.fullName}
      </td>
      <td className="py-2 px-4 whitespace-nowrap text-sm font-medium text-gray-500 ">
        {...[user.roles?.join(" / ") || "no"]}
      </td>
      <td className="py-2 px-4 whitespace-nowrap text-sm font-medium text-gray-500 ">
        {user?.email}
      </td>
      <td className="py-2 px-4 whitespace-nowrap text-sm font-medium text-gray-500 ">
        {!user?.address && "no address"}
      </td>
      <td className="py-2 px-4 whitespace-nowrap text-sm font-medium text-gray-500 ">
        {user?.phoneNumber}
      </td>
      <td className=" flex gap-2 py-2 px-4 whitespace-nowrap text-sm font-medium text-gray-500 ">
        <Button size="xs" variant="info" width="fit">
          <Edit size={15} />
        </Button>
        <Button size="xs" variant="danger" width="fit">
          <Trash size={15} />
        </Button>
      </td>
    </tr>
  ));
  return <>{data}</>;
}
