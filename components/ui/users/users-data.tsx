import Button from "../button";
import { Edit, Trash } from "lucide-react";
import { deleteUser, getAllUsers } from "@/lib/actions";
import Tr from "../table/tr";
import Td from "../table/td";
import { IUser } from "@/definitions";
import Image from "next/image";
import { useState } from "react";

type Props = {
  users: IUser[];
  currentUser: IUser;
};
export default function UsersData(props: Props) {
  const [deletePopoverToggle, setDeletePopoverToggle] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [targetedUserId, setTargetedUserId] = useState(-1);

  const users = props?.users;
  const currentUser = props?.currentUser;
  const isCurrentUser = (id: number) => id === currentUser?.id;
  let content;

  async function deleteTheUser(id: number) {
    setIsDeleting(true);
    try {
      const res = await deleteUser(Number(id));
      await getAllUsers();
      console.log(res);
      closeDeletePopover();
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  }

  const handleDeletePopoverToggle = (id: number) => {
    const userId = Number(id);

    // ?Notes
    // this condition logic must be on the same order to implement
    // the next click logic on the second condition
    if (deletePopoverToggle === false) {
      // if the client clicked the button display the popup
      setDeletePopoverToggle(true);
      setTargetedUserId(userId);
    } else if (deletePopoverToggle === true && targetedUserId === userId) {
      // if the client clicked the same button for the next time close the popup
      setDeletePopoverToggle(false);
      setTargetedUserId(-1);
    } else if (deletePopoverToggle === true && targetedUserId !== -1) {
      // if the client clicked another delete button display its popup
      setTargetedUserId(userId);
    } else {
      // any other logic disable the popup
      setDeletePopoverToggle(false);
      setTargetedUserId(-1);
    }
  };

  const closeDeletePopover = () => {
    setDeletePopoverToggle(false);
  };

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
            className="rounded border border-gray-300 size-10 object-cover"
          />
        </Td>
        <Td>{fullName}</Td>
        <Td>{...[roles?.join(" / ") || "no"]}</Td>
        <Td>{email}</Td>
        <Td className="relative">
          <div className="flex gap-1 md:gap-2 whitespace-nowrap text-sm font-medium text-gray-500 w-full h-full">
            <Button
              size="sm"
              outline
              variant="info"
              width="full"
              href={`users/update/${id}`}
              tag="link"
              id={id?.toString()}
            >
              <Edit size={15} />
            </Button>
            {!isCurrentUser(id as number) && (
              <Button
                size="sm"
                outline
                variant="danger"
                width="full"
                tag="button"
                disabled={isDeleting}
                // loading={isDeleting}
                onClick={() => handleDeletePopoverToggle(Number(id))}
                id={id?.toString()}
              >
                <Trash size={15} />
              </Button>
            )}
          </div>
          {/* {toggle ? ( */}
          {deletePopoverToggle && targetedUserId === id ? (
            <div className="min-w-full z-50 absolute right-1 top-full flex flex-col items-center justify-center gap-4 bg-white rounded border border-gray-300 shadow-lg shadow-gray-300 p-2">
              <p className="text-center">
                Delete User {id}.{fullName}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="danger"
                  size="xs"
                  onClick={() => deleteTheUser(Number(id))}
                >
                  {!isDeleting ? "Delete" : "Deleting..."}
                </Button>
                <Button
                  variant="info"
                  outline
                  size="xs"
                  onClick={closeDeletePopover}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : null}
        </Td>
      </Tr>
    )
  );

  if (users !== undefined) content = data;

  return <div>{content}</div>;
}
