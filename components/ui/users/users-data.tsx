import Button from "../button";
import { Edit, Trash } from "lucide-react";
import { getAllUsers } from "@/lib/actions";
import Tr from "../table/tr";
import Td from "../table/td";
import { IUser } from "@/definitions";
import Image from "next/image";
import { Suspense } from "react";

export default async function UsersData() {
  const users = await getAllUsers();
  console.log(users);
  // const

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

  if (!users?.data.data) content = noData;

  const data = users?.data.data.map(
    ({ id, imagePath = "", fullName = "Full Name", roles, email }: IUser) => (
      <Tr key={id}>
        <Td>{id}</Td>
        <Td>
          <Image
            src={imagePath || ""}
            width={40}
            height={40}
            alt={fullName}
            title={fullName}
            className="rounded border border-gray-300"
          />
        </Td>
        <Td>{fullName}</Td>
        <Td>{...[roles?.join(" / ") || "no"]}</Td>
        <Td>{email}</Td>
        <Td>
          <div className="flex gap-1 md:gap-2 whitespace-nowrap text-sm font-medium text-gray-500 w-full h-full">
            <Suspense fallback="loading...">
              <Button
                size="xs"
                outline
                variant="info"
                width="full"
                href={`users/update/${id}`}
                tag="link"
              >
                <Edit size={15} />
              </Button>
            </Suspense>
            <Button size="xs" outline variant="danger" width="full">
              <Trash size={15} />
            </Button>
          </div>
        </Td>
      </Tr>
    )
  );

  if (users?.data.data !== undefined) content = data;

  return <>{content}</>;
}
