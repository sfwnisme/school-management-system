"use client";
import React, { ReactNode, useRef, useState, useTransition } from "react";
import Input from "../input";
import {
  IFetchResponse2,
  IUser,
  YupUserResetPassword,
  IClientResponse,
} from "@/definitions";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetUserPassword } from "@/lib/actions";
import Button from "../button";
import { yupUserResetPasswordSchema } from "@/lib/validation-schema-yup";
import Message from "../message";
import FetchMessage from "../fetch-message";

type Props = {
  user: IClientResponse<IUser>;
};

export const revalid = 1;
export default function UserResetPasswordForm(props: Props) {
  const [isResetPassword, startResetPassword] = useTransition();
  const apiResponseMessagesRef = useRef<IFetchResponse2<[]>>({
    isEmpty: false,
    isSuccess: false,
    isError: false,
    message: "",
  });

  const { email } = props?.user.data as IUser
  // const email = props.user.data?.email ?? "";

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<YupUserResetPassword>({
    resolver: yupResolver(yupUserResetPasswordSchema),
    reValidateMode: "onChange",
    mode: "onChange",
    defaultValues: {
      email,
    },
  });

  const onSubmit: SubmitHandler<YupUserResetPassword> = (data) => {
    const { password, confirmPassword, email } = data
    const newPassword = {
      password,
      confirmPassword,
      email
    };
    startResetPassword(async () => {
      const res = await resetUserPassword(newPassword);
      if (res) {
        const { isSuccess, isError, message } = res;
        apiResponseMessagesRef.current = {
          isSuccess,
          isError,
          message,
        };
      } else {
        console.log(
          "unexpected error on the onSubmit user-reset-password-form.tsx"
        );
      }
    });
  };

  console.log(isResetPassword, isValid)

  return (
    <div className="w-full md:max-w-[700px] md:w-auto mx-auto rounded border border-gray-300 p-4">
      <h1 className="mb-4 text-lg font-medium underline">
        Update user&apos;s password:
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-4 gap-2"
      >
        <div className="col-span-full md:col-span-2">
          <Input
            type="password"
            placeholder="New password"
            variant={
              errors.password?.message
                ? "danger"
                : isValid
                  ? "success"
                  : "initial"
            }
            {...register("password")}
          />
          <Message variant="danger">{errors.password?.message}</Message>
        </div>
        <div className="col-span-full md:col-span-2">
          <Input
            type="password"
            placeholder="Confirm new password"
            variant={
              errors.confirmPassword?.message
                ? "danger"
                : isValid
                  ? "success"
                  : "initial"
            }
            {...register("confirmPassword")}
          />
          <Message variant="danger">{errors.confirmPassword?.message}</Message>
        </div>
        <Button
          variant="info"
          type="submit"
          loading={isResetPassword}
          disabled={!isValid || isResetPassword}
          loadingText="Updating..."
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
