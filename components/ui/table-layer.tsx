"use client";
import React, { Fragment, useRef, useState } from "react";
import Table from "./table/table";
import Thead from "./table/thead";
import Th from "./table/th";
import Tbody from "./table/tbody";
import Td from "./table/td";
import Tr from "./table/tr";
import Button from "./button";
import { Edit, Trash } from "lucide-react";
import { ITableHead, IUser } from "@/definitions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { revalidateTag } from "next/cache";
import { toast } from "react-toastify";
// import { useRouter } from "next/router";

type Props = {
  dataFunction: any;
  deleteFunction?: any;
  tableHeader: ITableHead[];
  // tableHeader: {
  //   [key: string]: string | { [key: string]: string; name: string }[];
  //   name: string;
  //   arr?: { [key: string]: string; name: string }[];
  // }[];
  currentUser?: IUser;
  route: string;
};

export default function TableLayer(props: Props) {
  // states
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletePopoverToggle, setDeletePopoverToggle] = useState(false);
  const [targetedUserId, setTargetedUserId] = useState(-1);
  const userRef = useRef(-1);

  // some endpoints id's names are not united, thus this
  // variable will check if it's 'id', 'instId' or whatever
  const idKey = props.tableHeader[0].key.toString();
  console.log(idKey);
  // props.tableHeader[0].key === "id" ? props.tableHeader[0].key : "instId";

  // check if the targeted id is the id of the current user
  const currentUser = props.currentUser;
  function isCurrentUser(id: number) {
    if (currentUser) {
      if (currentUser?.id === id) {
        return true;
      }
    }
    return false;
  }

  // this variable helps me check if the current table is for the users
  // I can use this to remove the delete button from the loggedin user's table row.
  const isUsersPage = Boolean(props?.currentUser);
  console.log(isUsersPage);

  const handleDeletePopoverToggle = (id: number) => {
    const userId = Number(id);

    // ?Notes
    // this condition logic must be on the same order to implement
    // the next click logic on the second condition
    if (deletePopoverToggle === false) {
      // if the client clicked the button display the popup
      setDeletePopoverToggle(true);
      userRef.current = userId;
      setTargetedUserId(userId);
    } else if (deletePopoverToggle === true && targetedUserId === userId) {
      // if the client clicked the same button for the next time close the popup
      setDeletePopoverToggle(false);
      setTargetedUserId(-1);
    } else if (deletePopoverToggle === true && targetedUserId !== -1) {
      // if the client clicked another delete button display its popup
      userRef.current = userId;
      setTargetedUserId(userId);
    } else {
      // any other logic disable the popup
      setDeletePopoverToggle(false);
      setTargetedUserId(-1);
    }
  };

  const closeDeletePopover = () => {
    setDeletePopoverToggle(false);
    setTargetedUserId(-1);
    userRef.current = -1;
  };

  // delete data form the database
  async function deleteDataFunction(id: number) {
    setIsDeleting(true);
    try {
      const res = await props.deleteFunction(Number(id));
      const toastType = res.success ? "success" : "error";
      toast?.[toastType](res.message);
      closeDeletePopover();
    } catch (error) {
      toast.error("catch table layer" as string);
    } finally {
      setIsDeleting(false);
    }
  }

  // table header
  const tableHeaderCells = props.tableHeader?.map((header) => (
    <Th key={header.name as string}>{header.name as string}</Th>
  ));

  // table body
  const tableBodyCells = props.dataFunction?.map((data: any) => (
    <Tr key={data.idKey}>
      {props.tableHeader?.map((head) => (
        <Td key={data[head.name as string]} id={data[idKey]}>
          {head.key === "imagePath" ? (
            <Image
              width={40}
              height={40}
              src={
                data?.[head?.key] ||
                "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
              }
              alt={data?.[idKey] || "data avatar"}
              className="size-10 border border-gray-300 rounded shadow-sm"
            />
          ) : Array.isArray(data[head.key as string]) ? (
            data[head.key as string].map((nestedArrayItem: ITableHead) =>
              (head.arr as ITableHead[])?.map(
                (ar: ITableHead) => `${[nestedArrayItem[ar.key as string]]}, `
              )
            )
          ) : (
            data[head.key as string]
          )}
        </Td>
      ))}
      <Td className="relative">
        <div className="flex gap-1 md:gap-2 whitespace-nowrap text-sm font-medium text-gray-500 w-full h-full">
          <Button
            size="sm"
            outline
            variant="info"
            width="full"
            href={`${props.route}/update/${data[idKey]}`}
            tag="link"
            id={data[idKey]}
          >
            <Edit size={15} />
          </Button>
          {isUsersPage && isCurrentUser(data["id"] as number) ? null : (
            <Button
              size="sm"
              outline
              variant="danger"
              width="full"
              tag="button"
              disabled={isDeleting}
              onClick={() => handleDeletePopoverToggle(Number(data[idKey]))}
              id={data[idKey]}
            >
              <Trash size={15} />
            </Button>
          )}
        </div>
        {deletePopoverToggle && targetedUserId === data[idKey] ? (
          <div className="min-w-full z-50 absolute right-1 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-4 bg-white rounded border border-gray-300 shadow-lg shadow-gray-300 p-2">
            <p className="text-center">
              Delete User {data[idKey]}.{data?.fullName}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="danger"
                size="xs"
                onClick={() => deleteDataFunction(Number(data[idKey]))}
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
  ));

  // table body no data
  const tableBodyCellsNoData = (
    <Tr>
      <Td
        className="text-center bg-gray-50 text-gray-600 font-bold"
        colSpan={10}
      >
        No data!
      </Td>
    </Tr>
  );

  return (
    <Table rounded="sm">
      <Thead>
        <Tr>
          {tableHeaderCells}
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>{tableBodyCells}</Tbody>
    </Table>
  );
}
