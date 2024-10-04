"use client";
import React, { useRef, useTransition } from "react";
import Input from "../input";
import {
  IApiResponseReturn,
  IFetchResponse,
  IFetchResponse2,
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
import FetchMessage from "../fetch-message";

type Props = {
  user: IFetchResponse<IUser | undefined | null>;
  roles: IFetchResponse<IRole[]> | undefined;
};

export default function UserUpdateForm(props: Props) {
  const [isUpdatingUser, startUpdatingUser] = useTransition();
  const apiResponseMessagesRef = useRef<IFetchResponse2<undefined>>({
    isSuccess: false,
    isError: false,
    message: "",
  });

  const user = props?.user;
  const roles = props?.roles;

  const currentRole = () => {
    if (roles?.status === "not_empty") {
      const findTheCurrentRole = roles.data?.find((role) => {
        if (role.name === user.data?.roles?.[0]) {
          return role.id;
        }
      });
      return findTheCurrentRole?.id;
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<YupUserUpdateInputs>({
    resolver: yupResolver(yupUserUpdateSchema),
    mode: "onChange",
    defaultValues: {
      userName: user.data?.userName ?? "",
      fullName: user.data?.fullName ?? "",
      email: user.data?.email ?? "",
    },
  });

  const onSubmit: SubmitHandler<YupUserUpdateInputs> = async (data) => {
    startUpdatingUser(async () => {
      const newUserData = {
        id: user.data?.id,
        userName: data?.userName,
        fullName: data?.fullName,
        email: data?.email,
        roleId: Number(data.roleId),
      };
      //check if the user roles available, validation success,
      if (isValid && roles?.status === "not_empty") {
        console.log("function fired");
        const res = await updateUser(newUserData);
        if (res) {
          const { isSuccess, isError, message } = res;
          apiResponseMessagesRef.current = {
            isSuccess,
            isError,
            message,
          };
        }
      }
    });
  };

  // this function helps me select the initial role "User", in this scenario I can prevent modifying this role
  const userRolesSelectData = roles?.data?.map((role) => (
    <option id={role?.id?.toString()} value={role.id} key={role.id}>
      {role.name}
    </option>
  ));

  const userRolesSelectJsxError = (
    <option disabled selected>
      request error😑
    </option>
  );
  const userRolesSelectJsxNoData = (
    <option disabled selected>
      no roles😑
    </option>
  );

  const userRolesSelectJsx =
    roles?.status === "not_empty"
      ? userRolesSelectData
      : roles?.status === "empty"
      ? userRolesSelectJsxNoData
      : userRolesSelectJsxError;

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
          className="disabled:opacity-50 disabled:cursor-not-allowed w-full h-fit border border-gray-500 rounded text-black text-sm px-4 py-2 cursor-pointer col-span-1"
          disabled={["empty", "error"].includes(roles?.status ?? "idle")}
          title={
            Boolean(roles?.status === "error")
              ? "unexpected error please report"
              : roles?.status === "empty"
              ? "no roles yet"
              : "select the role"
          }
        >
          {userRolesSelectJsx}
        </select>
        <Button
          variant="info"
          type="submit"
          loading={isUpdatingUser}
          disabled={
            isUpdatingUser ||
            !isValid ||
            ["empty", "error"].includes(roles?.status ?? "idle")
          }
          loadingText="Updating..."
          title={
            Boolean(roles?.status === "error")
              ? "unexpected error in the roles request please report"
              : roles?.status === "empty"
              ? "no roles yet. you should create roles, so you can update the users"
              : "update"
          }
        >
          Update
        </Button>
        <FetchMessage
          message={apiResponseMessagesRef.current.message}
          isSuccess={apiResponseMessagesRef.current.isSuccess}
          isError={apiResponseMessagesRef.current.isError}
        />
      </form>
    </div>
  );
}
