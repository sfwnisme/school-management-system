"use client";
import { deleteUser, getAllUsers } from "@/lib/actions";
import React, { EventHandler, Fragment, useState } from "react";
import Button from "./button";
import { Loader, Trash } from "lucide-react";

type Props = {
  // children: React.ReactNode;
  id: number;
};

export default function DeleteButton(props: Props) {
  const [isDeleting, setIsDeleting] = useState(false);
  async function deleteTheUser() {
    setIsDeleting(true);
    try {
      const res = await deleteUser(props.id);
      await getAllUsers();
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div onClick={deleteTheUser}>
      <Button
        size="sm"
        outline
        variant="danger"
        width="full"
        tag="button"
        loading={isDeleting}
        // loadingText={<Loader />}
      >
        <Trash size={15} />
      </Button>
    </div>
  );
}
