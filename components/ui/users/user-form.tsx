"use client";
import React from "react";
import Input from "../input";
import { IRole, IUser } from "@/definitions";
import FileInput from "../file-input";

type Props = {
  user: IUser;
  roles: IRole[];
};

export default function UserForm(props: Props) {
  const user = props?.user;
  console.log(user);

  return (
    <div>
      <div className="max-w-[700px]">
        <form className="grid grid-cols-4 gap-2">
          <div className="col-span-full md:col-span-2">
            <Input type="text" name="fullName" placeholder="Your full name" />
          </div>
          <div className="col-span-full md:col-span-2">
            <Input type="text" name="username" placeholder="Your user name" />
          </div>
          <div className="col-span-full md:col-span-3">
            <Input type="text" name="email" placeholder="Your email" />
          </div>
          <div className="col-span-full md:col-span-1">
            <select className="border border-gray-500 h-full w-full rounded">
              <option id="" value={""}>
                roles
              </option>
            </select>
          </div>
          <div className="col-span-full">
            <FileInput type="file" name="imagePath" placeholder="Your image" />
          </div>
        </form>
      </div>
    </div>
  );
}
