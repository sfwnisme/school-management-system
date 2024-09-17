"use client";
import { deleteUser } from "@/lib/actions";
import React, { EventHandler, Fragment } from "react";

type Props = {
  children: React.ReactNode;
  id: number;
};

export default function DeleteButton(props: Props) {
  async function deleteTheUser() {
    try {
      const res = await deleteUser(props.id);
    } catch (error) {
      console.log(error);
    }
  }

  return <div onClick={deleteTheUser}>{props.children}</div>;
}
