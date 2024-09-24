"use client";
import React, { useRef, useState } from "react";
import Table from "./table/table";
import Thead from "./table/thead";
import Th from "./table/th";
import Tbody from "./table/tbody";
import Td from "./table/td";
import Tr from "./table/tr";
import Button from "./button";
import { Edit, Trash } from "lucide-react";
import { IUser } from "@/definitions";

type Props = {
  dataFunction: any;
  deleteFunction?: any;
  tableHeader: { key: string; name: string }[];
  currentUser?: IUser;
};

export default function TableLayer(props: Props) {
  // states
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletePopoverToggle, setDeletePopoverToggle] = useState(false);
  const [targetedUserId, setTargetedUserId] = useState(-1);
  const userRef = useRef(-1);

  const currentUser = props.currentUser;
  console.log(currentUser);

  // check if the targeted id is the id of the current user
  function isCurrentUser(id: number) {
    if (currentUser?.id === id) {
      return true;
    }
    return false;
  }
  // function isUsersPage() {
  //   if(props.currentUser) {
  //     return true
  //   }
  //   return false
  // }
  const isUsersPage = props?.currentUser ? true : false;
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
      const updatedData = await props.dataFunction();
      closeDeletePopover();
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  }

  // table header
  const tableHeaderCells = props.tableHeader?.map((header) => (
    <Th key={header.key}>{header.name}</Th>
  ));

  // table body
  const tableBodyCells = props.dataFunction?.map((data: any) => (
    <Tr key={data.id}>
      {props.tableHeader?.map((head) => (
        <>
          {head.key === "imagePath" ? (
            <Td key={data.id}>
              <img
                src={data[head?.key]}
                alt={data[head?.key]}
                className="size-10"
              />
            </Td>
          ) : (
            // ""
            <>
              <Td key={data.id}>{data[head?.key]}</Td>
            </>
          )}
        </>
      ))}
      <Td className="relative">
        <div className="flex gap-1 md:gap-2 whitespace-nowrap text-sm font-medium text-gray-500 w-full h-full">
          <Button
            size="sm"
            outline
            variant="info"
            width="full"
            href={`users/update/${data["id" || "instId"]}`}
            tag="link"
            id={data["id" || "instId"]}
          >
            <Edit size={15} />
          </Button>
          {isUsersPage && !isCurrentUser(data["id" || "instId"] as number) ? (
            <Button
              size="sm"
              outline
              variant="danger"
              width="full"
              tag="button"
              disabled={isDeleting}
              // loading={isDeleting}
              onClick={() => handleDeletePopoverToggle(Number(data["id"]))}
              id={data["id" || "instId"]}
            >
              <Trash size={15} />
            </Button>
          ) : (
            <Button
              size="sm"
              outline
              variant="danger"
              width="full"
              tag="button"
              disabled={isDeleting}
              // loading={isDeleting}
              onClick={() => handleDeletePopoverToggle(Number(data["id"]))}
              id={data["id" || "instId"]}
            >
              <Trash size={15} />
            </Button>
          )}
        </div>
        {deletePopoverToggle && targetedUserId === data["id" || "instId"] ? (
          <div className="min-w-full z-50 absolute right-1 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-4 bg-white rounded border border-gray-300 shadow-lg shadow-gray-300 p-2">
            <p className="text-center">
              Delete User {data["id" || "instId"]}.{data?.fullName}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="danger"
                size="xs"
                onClick={() =>
                  deleteDataFunction(Number(data["id" || "instId"]))
                }
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
