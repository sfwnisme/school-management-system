"use client";
import React, { Suspense, useState, useTransition } from "react";
import Table from "./table";
import Thead from "./thead";
import Th from "./th";
import Tbody from "./tbody";
import Td from "./td";
import Tr from "./tr";
// import Button from "./button";
import { Edit, Trash } from "lucide-react";
import { IClientResponse, ITableHead, IUser } from "@/definitions";
import Image from "next/image";
import { toast } from "react-toastify";
import Button from "../button";
import TableSkeleton from "../skeletons/table-skeleton";
// import TableSkeleton from "./skeletons/table-skeleton";

type Props = {
  dataFunction: any;
  deleteFunction?: any;
  tableHeader: ITableHead[];
  currentUser?: IClientResponse<IUser>;
  route: string;
};

export default function TableLayer(props: Props) {
  // states
  const [isDeleting, startDeleting] = useTransition();
  const [deletePopoverToggle, setDeletePopoverToggle] = useState(false);
  const [targetedUserId, setTargetedUserId] = useState(-1);
  const { data, isEmpty, isSuccess, isError, message } = props.dataFunction;

  // some endpoints id's names are not united, thus this
  // variable will check if it's 'id', 'instId' or whatever
  const idKey = props.tableHeader[0].key.toString();

  //------------------------
  // current user delete button logic
  //------------------------
  // check if the targeted id is the id of the current user
  const currentUserId = props.currentUser?.data?.id;
  function isCurrentUser(id: number) {
    if (props?.currentUser?.isSuccess && currentUserId) {
      if (currentUserId === id) {
        return true;
      }
    }
    return false;
  }

  // this variable helps me check if the current table is for the users
  // I can use this to remove the delete button from the loggedin user's table row.
  const isUsersPage = Boolean(props?.currentUser);
  //::::::::::::::

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
    setTargetedUserId(-1);
  };

  // delete data form the database
  function deleteDataFunction(id: number) {
    startDeleting(async () => {
      const { isSuccess, isError, message } = await props.deleteFunction(id);
      const toastType = isSuccess ? "success" : "error";
      //NOTE: the error message sometimes it returns an array
      const messageArrayOrString = Array.isArray(message)
        ? message.join(" ")
        : message;
      toast[toastType](messageArrayOrString);
      closeDeletePopover();
    });
  }

  // table header
  const tableHeaderCells = props.tableHeader?.map((header) => (
    <Th key={header.key as React.Key}>{header.name}</Th>
  ));

  let content;

  // table body
  const tableBodyCells =
    data &&
    data?.map((data: any) => (
      <Tr key={data[idKey]}>
        {props.tableHeader?.map((head) => (
          <Td key={head.name} id={data[idKey]}>
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
                  (ar: ITableHead) =>
                    `${[nestedArrayItem[ar.key as string]]}, `,
                ),
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
                  disabled={isDeleting}
                >
                  {!isDeleting ? "Delete" : "Deleting..."}
                </Button>
                <Button
                  variant="info"
                  outline
                  size="xs"
                  onClick={closeDeletePopover}
                  disabled={isDeleting}
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
  const tableBodyCellsIsEmpty = (
    <Tr>
      <Td
        className="text-center bg-yellow-50 text-yellow-600 font-semibold"
        colSpan={10}
      >
        Error to get data!
      </Td>
    </Tr>
  );

  const tableBodyCellsIsError = (
    <Tr>
      <Td
        className="text-center bg-red-50 text-red-600 font-semibold"
        colSpan={10}
      >
        Error to get data!
      </Td>
    </Tr>
  );
  console.log(isEmpty, isError, isSuccess);

  if (isSuccess) {
    content = tableBodyCells;
  }
  if (isEmpty) {
    content = tableBodyCellsIsEmpty;
  }
  if (isError) {
    content = tableBodyCellsIsError;
  }

  let finalContent = (
    <Suspense fallback={<TableSkeleton cols={4} rows={8} />}>
      <Table rounded="sm">
        <Thead>
          <Tr>
            {tableHeaderCells}
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>{content}</Tbody>
      </Table>
    </Suspense>
  );
  return finalContent;
}
