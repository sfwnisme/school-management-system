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
      <Td>{user?.fullName}</Td>
      <Td>{...[user.roles?.join(" / ") || "no"]}</Td>
      <Td>{user?.email}</Td>
      <Td className=" flex gap-1 md:gap-2 py-2 px-4 whitespace-nowrap text-sm font-medium text-gray-500 ">
        <Button size="xs" outline variant="info" width="full">
          <Edit size={15} />
        </Button>
        <Button size="xs" outline variant="danger" width="full">
          <Trash size={15} />
        </Button>
      </Td>
    </Tr>
  ));

  if (users?.data.data !== undefined) content = data;

  return <>{content}</>;
}
