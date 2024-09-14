"use client";
import React, { useState } from "react";
import Input from "../input";
import { IRole, IUser } from "@/definitions";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateUser } from "@/lib/actions";
import Button from "../button";

type Props = {
  user: IUser;
  roles: IRole[];
  userRoles: IRole[];
};

type Inputs = {
  id?: number;
  userName: string;
  fullName: string;
  email: string;
};

export default function UserForm(props: Props) {
  const user = props?.user;
  const roles = props?.roles;
  const userRoles = props?.userRoles;
  const [isPending, setIsPending] = useState(false);

  //--------------------------------
  // form submit
  //--------------------------------
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors, isValid },
  } = useForm<IUser>({
    // resolver: yupResolver(UserSchema),
    mode: "onChange",
    defaultValues: {
      userName: user?.userName,
      fullName: user?.fullName,
      email: user?.email,
    },
  });

  const onSubmit: SubmitHandler<IUser> = async (data) => {
    setIsPending(true);
    try {
      const newUserData = {
        id: user?.id,
        userName: data?.userName,
        fullName: data?.fullName,
        email: data?.email,
      };
      let res = await updateUser(newUserData);
      return res;
    } catch (error) {
      console.log("update user error", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div>
      <div className="max-w-[700px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-4 gap-2"
        >
          <div className="col-span-full md:col-span-2">
            <Input
              type="text"
              placeholder="Your full name"
              {...register("fullName")}
            />
          </div>
          <div className="col-span-full md:col-span-2">
            <Input
              type="text"
              placeholder="Your user name"
              {...register("userName")}
            />
          </div>
          <div className="col-span-full md:col-span-full">
            <Input
              type="text"
              placeholder="Your email"
              {...register("email")}
            />
          </div>
          {/* <div className="col-span-full">
            <FileInput
              type="file"
              // name="imagePath"
              placeholder="Your image"
              {...register("imagePath")}
              onChange={(e) => setImageState(e.target.files[0])}
            />
          </div> */}
          <Button
            variant="info"
            type="submit"
            loading={isPending}
            disabled={isPending}
          >
            Update
          </Button>
        </form>
      </div>
    </div>
  );
}
