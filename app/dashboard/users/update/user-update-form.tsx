"use client";
import React, { useTransition } from "react";
import Input from "@/components/ui/input";
import {
  IClientResponse,
  IRole,
  IUser,
  YupUserUpdateInputs,
} from "@/definitions";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateUser } from "@/lib/actions";
import Button from "@/components/ui/button";
import { yupUserUpdateSchema } from "@/lib/validation-schema-yup";
import Message from "@/components/ui/message";
import FetchMessage from "@/components/ui/fetch-message";
import useFetchResponse from "@/hooks/use-fetch-response";
import { useRolessOptions } from "@/hooks/use-roles-options";

type Props = {
  user: IClientResponse<IUser>;
  roles: IClientResponse<IRole[]>;
};

export default function UserUpdateForm(props: Props) {
  const [isUpdating, startUpdatingUser] = useTransition();
  const { responseRef, updateResponse } = useFetchResponse();

  const {
    id: userId,
    fullName,
    userName,
    email,
    roles,
  } = props?.user.data || {};

  console.log("sfwn is me", props?.roles.data);

  const { options, selectNotAllowed, message } = useRolessOptions(props?.roles);
  const findRoleId = props?.roles?.data?.find(
    (role) => role.name === roles?.[0],
  )?.name;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<YupUserUpdateInputs>({
    resolver: yupResolver(yupUserUpdateSchema),
    mode: "onChange",
    defaultValues: {
      userName: userName,
      fullName: fullName,
      email: email,
    },
  });

  const isUpdatingValid = isValid && !selectNotAllowed;
  const isButtonValid = isUpdating || !isUpdatingValid;
  const onSubmit: SubmitHandler<YupUserUpdateInputs> = async (data) => {
    startUpdatingUser(async () => {
      const newUserData = {
        id: userId,
        userName: data?.userName,
        fullName: data?.fullName,
        email: data?.email,
        roleId: Number(data?.roleId),
      };
      if (isUpdatingValid) {
        const res = await updateUser(newUserData);
        if (res) {
          updateResponse(res);
        }
      }
    });
  };

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
          defaultValue={findRoleId}
          className="disabled:opacity-50 disabled:cursor-not-allowed w-full h-fit border border-gray-500 rounded text-black text-sm px-4 py-2 cursor-pointer col-span-1"
          disabled={selectNotAllowed}
          title={
            selectNotAllowed
              ? message + " please contact the support"
              : "select the role"
          }
        >
          <option selected={!findRoleId} disabled>
            select role
          </option>
          {options}
        </select>
        <div className="col-span-full">
          <Button
            variant="info"
            type="submit"
            width="full"
            loading={isUpdating}
            disabled={isButtonValid}
            loadingText="Updating..."
          >
            Update
          </Button>
        </div>
        <FetchMessage
          message={responseRef.current.message}
          isSuccess={responseRef.current.isSuccess}
          isError={responseRef.current.isError}
        />
      </form>
    </div>
  );
}
