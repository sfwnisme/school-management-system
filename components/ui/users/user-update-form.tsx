"use client";
import React, { useRef, useTransition } from "react";
import Input from "../input";
import {
  IClientResponse,
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
import FetchMessage from "../fetch-message";

type Props = {
  user: IClientResponse<IUser>;
  roles: IClientResponse<IRole[]> | undefined;
};

export default function UserUpdateForm(props: Props) {
  const [isUpdatingUser, startUpdatingUser] = useTransition();
  const apiResponseMessagesRef = useRef<IFetchResponse2<undefined>>({
    isSuccess: false,
    isError: false,
    message: "",
  });

  // const user = props?.user;
  // const roles = props?.roles;
  const {
    id: userId = -1,
    fullName = "",
    userName = "",
    email = "",
    roles = []
  } = props?.user.data as IUser

  const {
    data: rolesData,
    isEmpty: isEmptyRoles,
    isSuccess: isSuccessRoles,
    isError: isErrorRoles,
    message: messageRoles
  } = props?.roles as IClientResponse<IRole[]>

  const currentRole = () => {
    if (isSuccessRoles) {
      const findTheCurrentRole = rolesData?.find((role) => {
        if (role.name === roles?.[0]) {
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
      userName: userName,
      fullName: fullName,
      email: email,
    },
  });

  const onSubmit: SubmitHandler<YupUserUpdateInputs> = async (data) => {
    startUpdatingUser(async () => {
      const newUserData = {
        id: userId,
        userName: data?.userName,
        fullName: data?.fullName,
        email: data?.email,
        roleId: Number(data.roleId),
      };
      //check if the user roles available, validation success,
      if (isValid && isSuccessRoles && !isEmptyRoles) {
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

  console.log(isValid, isSuccessRoles, isEmptyRoles)

  //-----------------
  // roles jsx options
  //-----------------
  const userRolesSelectDataisSuccess = rolesData?.map((role) => (
    <option id={role?.id?.toString()} value={role.id} key={role.id}>
      {role.name}
    </option>
  ));

  const userRolesSelectDataIsError = (
    <option disabled selected>
      request error😑
    </option>
  );
  const userRolesSelectDataisEmpty = (
    <option disabled selected>
      no roles😑
    </option>
  );

  let userRolesSelectJsx
  if (isSuccessRoles) {
    userRolesSelectJsx = userRolesSelectDataisSuccess
  }
  if (isEmptyRoles) {
    userRolesSelectJsx = userRolesSelectDataisEmpty
  }
  if (isErrorRoles) {
    userRolesSelectJsx = userRolesSelectDataIsError
  }
  //-----------------

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
          disabled={isEmptyRoles || isErrorRoles}
          title={
            isErrorRoles
              ? messageRoles.join(' ') + ' please contact the support'
              // ? "unexpected error please report"
              : isEmptyRoles
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
            isEmptyRoles || isErrorRoles
          }
          loadingText="Updating..."
          title={
            isErrorRoles
              ? "unexpected error in the roles request please report"
              : isEmptyRoles
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
