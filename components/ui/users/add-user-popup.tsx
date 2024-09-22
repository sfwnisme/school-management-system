import React from "react";
import UserCreateForm from "./user-create-form";
import Button from "../button";
import { X } from "lucide-react";

export default function AddUserPopup(props) {
  const handleToggle = () => {
    props.setToggle((prev) => !prev);
  };
  return (
    <>
      {props.toggle && (
        <div className="ADDUSERPOPUP bg-white/30 backdrop-blur-lg flex items-center justify-center z-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  rounded w-full h-full">
          <Button onClick={handleToggle}>
            <X />
          </Button>
          <UserCreateForm />
        </div>
      )}
    </>
  );
}
