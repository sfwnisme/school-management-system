import Button from "../button";
import { Edit, Trash } from "lucide-react";
import { getAllUsers, getCurrentUser } from "@/lib/actions";
import Tr from "../table/tr";
import Td from "../table/td";
import { IUser } from "@/definitions";
import Image from "next/image";
import { Suspense } from "react";
import DeleteButton from "../delete-button";

export default async function UsersData() {
  const users = await getAllUsers();
  const currentUser = await getCurrentUser();
  const isCurrentUser = (id: number) => id === currentUser?.data.data.id;
  let content;

  const noData = (
    <Tr>
      <Td
        className="text-center bg-gray-50 text-gray-600 font-bold"
        colSpan={10}
      >
        No data!
      </Td>
    </Tr>
  );

  if (!users) content = noData;

  const data = users?.map(
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
                size="sm"
                outline
                variant="info"
                width="full"
                href={`users/update/${id}`}
                tag="link"
              >
                <Edit size={15} />
              </Button>
            </Suspense>
            {!isCurrentUser(id as number) && <DeleteButton id={Number(id)} />}
          </div>
        </Td>
      </Tr>
    )
  );

  if (users !== undefined) content = data;

  return <>{content}</>;
}
