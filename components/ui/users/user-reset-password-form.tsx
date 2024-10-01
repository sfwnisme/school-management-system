"use client";
import React, { useRef, useState, useTransition } from "react";
import Input from "../input";
import {
  IApiResponseReturn,
  IResponse,
  IUser,
  YupUserResetPassword,
} from "@/definitions";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getAllUsers, resetUserPassword } from "@/lib/actions";
import Button from "../button";
import { yupUserResetPasswordSchema } from "@/lib/validation-schema-yup";
import Message from "../message";
import ConditionalMessage from "../conditional-message";

type Props = {
  user: IUser;
};

type Inputs = {
  userName: string;
  fullName: string;
  email?: string;
};
export const revalid = 1;
export default function UserResetPasswordForm(props: Props) {
  const [isResetPassword, startResetPassword] = useTransition();
  const apiResponseMessagesRef = useRef<IApiResponseReturn<any>>({
    success: undefined,
    error: undefined,
    status: "idle",
  });

  const email = props?.user && props?.user.email;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, disabled, isValidating },
  } = useForm<YupUserResetPassword>({
    resolver: yupResolver(yupUserResetPasswordSchema),
    reValidateMode: "onChange",
    mode: "onChange",
    defaultValues: {
      email,
    },
  });

  console.log(isValidating);

  const onSubmit: SubmitHandler<YupUserResetPassword> = (data) => {
    const newPassword = {
      password: data.password,
      confirmPassword: data.confirmPassword,
      email: data.email,
    };
    startResetPassword(async () => {
      const res = await resetUserPassword(newPassword);
      if (res) {
        const { success, error, status } = res;
        apiResponseMessagesRef.current = {
          success,
          error,
          status,
        };
      } else {
        console.log(
          "unexpected error on the onSubmit user-reset-password-form.tsx"
        );
      }
    });
  };

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
          disabled={isResetPassword || !isValid}
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
