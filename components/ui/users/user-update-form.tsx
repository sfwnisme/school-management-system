"use client";
import React, { ChangeEvent, Fragment, useState } from "react";
import Input from "../input";
import { IRole, IUser, YupUserUpdateInputs } from "@/definitions";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getAllUsers, resetUserPassword, updateUser } from "@/lib/actions";
import Button from "../button";
import { yupUserUpdateSchema } from "@/lib/validation-schema-yup";
import Message from "../message";

type Props = {
  user: IUser;
  roles: IRole[];
  userRoles: {
    userId: number;
    roles: IRole[];
  };
};

type Inputs = {
  userName: string;
  fullName: string;
  email?: string;
};
export const revalid = 1;
export default function UserUpdateForm(props: Props) {
  const [responseMessage, setResponseMessage] = useState({
    status: -1,
    message: "",
  });
  const [resetPassword, setResetPassword] = useState(false);
  const user = props?.user;
  const roles = props?.roles;
  const [isPending, setIsPending] = useState(false);

  const currentRole = () => {
    const findTheCurrentRole = roles.find((role) => {
      if (role.name === user.roles?.[0]) {
        return role.id;
      }
    });
    return findTheCurrentRole?.id;
  };

  //--------------------------------
  // form submit
  //--------------------------------
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<YupUserUpdateInputs>({
    resolver: yupResolver(yupUserUpdateSchema),
    mode: "onChange",
    defaultValues: {
      userName: user?.userName,
      fullName: user?.fullName,
      email: user?.email,
    },
  });

  const onSubmit: SubmitHandler<YupUserUpdateInputs> = async (data) => {
    setIsPending(true);
    try {
      const newUserData = {
        id: user?.id,
        userName: data?.userName,
        fullName: data?.fullName,
        email: data?.email,
        roleId: Number(data.roleId),
      };
      const res = await updateUser(newUserData);
      console.log(res);
      setResponseMessage({
        status: res,
        message:
          res === 200
            ? "User's information updated successfully"
            : "Try another time",
      });
      await getAllUsers();
      return res;
    } catch (error) {
      console.log("update user error", error);
    } finally {
      setIsPending(false);
    }
  };

  // this function helps me select the initial role "User", in this scenario I can prevent modifying this role
  const userRolesSelectJsx = roles.map((role) => (
    <option id={role?.id?.toString()} value={role.id} key={role.id}>
      {role.name}
    </option>
  ));

  return (
    <div className="w-full md:max-w-[700px] md:w-auto mx-auto rounded border border-gray-300 p-4">
      <h1 className="mb-4 text-lg font-medium underline">
        Update user's info:
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-4 gap-2"
      >
        <div className="col-span-full md:col-span-2">
          <Input
            type="text"
            placeholder="Your full name"
            variant={
              errors.fullName?.message
                ? "danger"
                : isValid
                ? "success"
                : "initial"
            }
            {...register("fullName")}
          />
          <Message variant="danger">{errors.fullName?.message}</Message>
        </div>
        <div className="col-span-full md:col-span-2">
          <Input
            type="text"
            placeholder="Your user name"
            variant={
              errors.userName?.message
                ? "danger"
                : isValid
                ? "success"
                : "initial"
            }
            {...register("userName")}
          />
          <Message variant="danger">{errors.userName?.message}</Message>
        </div>
        <div className="col-span-full md:col-span-3">
          <Input
            type="text"
            placeholder="Your email"
            variant={
              errors.email?.message ? "danger" : isValid ? "success" : "initial"
            }
            {...register("email")}
          />
          <Message variant="danger">{errors.email?.message}</Message>
        </div>
        <select
          {...register("roleId")}
          defaultValue={currentRole()}
          className="w-full h-fit border border-gray-500 rounded text-black text-sm px-4 py-2 cursor-pointer col-span-1"
        >
          {userRolesSelectJsx}
        </select>
        <Button
          variant="info"
          type="submit"
          loading={isPending}
          disabled={isPending || !isValid}
          loadingText="Updating..."
        >
          Update
        </Button>
        {responseMessage.message && (
          <div className="col-span-full">
            <Message
              variant={responseMessage.status === 200 ? "success" : "danger"}
            >
              {responseMessage.message}
            </Message>
          </div>
        )}
      </form>
    </div>
  );
}
