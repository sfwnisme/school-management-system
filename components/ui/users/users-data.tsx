import Button from "../button";
import { Edit, Trash } from "lucide-react";
import { getAllUsers, getUserById } from "@/lib/actions";
import Tr from "../table/tr";
import Td from "../table/td";
import { IUser } from "@/definitions";
import Image from "next/image";
import Link from "next/link";

export default async function UsersData() {
  const users = await getAllUsers();

  let content;

  const noData = (
    <Tr>
      <Td
        className="text-center bg-gray-50 text-gray-600 font-bold"
        colSpan={10}
      >
        No data!
      </Td>
      {/* <div>No data</div> */}
    </Tr>
  );

  if (users?.data.data === undefined) content = noData;

  const data = users?.data.data.map((user: IUser) => (
    <Tr key={user?.id}>
      <Td>{user?.id}</Td>
      <Td>
        <Image
          src={user?.imagePath !== null ? user?.imagePath : ""}
          width={40}
          height={40}
          alt={user.fullName}
          title={user.fullName}
          className="rounded border border-gray-300"
        />
      </Td>
      <Td>{user?.fullName}</Td>
      <Td>{...[user.roles?.join(" / ") || "no"]}</Td>
      <Td>{user?.email}</Td>
      <Td className=" flex gap-1 md:gap-2 py-2 px-4 whitespace-nowrap text-sm font-medium text-gray-500 ">
        <Link href={`users/update/${user.id}`} className="w-full">
          <Button size="xs" outline variant="info" width="full">
            <Edit size={15} />
          </Button>
        </Link>
        <Button size="xs" outline variant="danger" width="full">
          <Trash size={15} />
        </Button>
      </Td>
    </Tr>
  ));

  if (users?.data.data !== undefined) content = data;

  return <>{content}</>;
}
