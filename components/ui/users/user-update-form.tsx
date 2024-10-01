"use client";
import React, { useRef, useTransition } from "react";
import Input from "../input";
import {
  IApiResponseReturn,
  IRole,
  IUser,
  YupUserUpdateInputs,
} from "@/definitions";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateUser } from "@/lib/actions";
import Button from "../button";
import { yupUserUpdateSchema } from "@/lib/validation-schema-yup";
import Message from "../message";
import ConditionalMessage from "../conditional-message";

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
  const [isUpdatingUser, startUpdatingUser] = useTransition();
  const apiResponseMessagesRef = useRef<IApiResponseReturn<undefined>>({
    success: undefined,
    error: undefined,
    status: "idle",
  });

  const user = props?.user;
  const roles = props?.roles;

  const currentRole = () => {
    const findTheCurrentRole = roles.find((role) => {
      if (role.name === user?.roles?.[0]) {
        return role.id;
      }
    });
    return findTheCurrentRole?.id;
  };

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
    startUpdatingUser(async () => {
      const newUserData = {
        id: user?.id,
        userName: data?.userName,
        fullName: data?.fullName,
        email: data?.email,
        roleId: Number(data.roleId),
      };
      const res = await updateUser(newUserData);
      if (res) {
        const { success, error, status } = res;
        apiResponseMessagesRef.current = {
          success,
          error,
          status,
        };
      }
    });
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
        Update user&apos;s info:
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
          loading={isUpdatingUser}
          disabled={isUpdatingUser || !isValid}
          loadingText="Updating..."
        >
          Update
        </Button>
        <ConditionalMessage
          success={apiResponseMessagesRef.current.success}
          error={apiResponseMessagesRef.current.error}
          status={apiResponseMessagesRef.current.status}
        />
      </form>
    </div>
  );
}
