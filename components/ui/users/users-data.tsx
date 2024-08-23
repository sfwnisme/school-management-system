// "use client";
import React from "react";
import Button from "../button-with-link";
import { Edit, Trash } from "lucide-react";
import { getAllUsers } from "@/lib/actions";

export default async function UsersData() {
  const users = await getAllUsers();

  // const usersData = await props?.usersData;
  const data = users?.data?.data?.map((user: IUser) => (
    <tr key={user?.id} className="divide-x">
      <td className="py-2 px-4 whitespace-nowrap text-sm font-medium text-gray-500 ">
        {user?.id}
      </td>
      <td className="py-2 px-4 whitespace-nowrap text-sm font-medium text-gray-500 ">
        {user?.fullName}
      </td>
      <td className="py-2 px-4 whitespace-nowrap text-sm font-medium text-gray-500 ">
        {user?.email}
      </td>
      <td className="py-2 px-4 whitespace-nowrap text-sm font-medium text-gray-500 ">
        {user?.address}
      </td>
      <td className="py-2 px-4 whitespace-nowrap text-sm font-medium text-gray-500 ">
        {user?.country}
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
