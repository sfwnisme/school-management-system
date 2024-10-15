"use client";
import React, { ReactNode, useRef, useState, useTransition } from "react";
import Input from "../input";
import {
  IFetchResponse,
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
import useFetchResponse from "@/hooks/use-fetch-response";

type Props = {
  user: IClientResponse<IUser>;
};

export const revalid = 1;
export default function UserResetPasswordForm(props: Props) {
  const [isUpdating, startUpdating] = useTransition();
  const { responseRef, updateResponse } = useFetchResponse()

  const { email } = props?.user.data || {}

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

  const isUpdatingValid = isValid
  const isButtonValid = isUpdating || !isUpdatingValid
  const onSubmit: SubmitHandler<YupUserResetPassword> = (data) => {
    const { password, confirmPassword, email } = data
    const newPassword = {
      password,
      confirmPassword,
      email
    };
    startUpdating(async () => {
      if (isUpdatingValid) {
        const res = await resetUserPassword(newPassword);
        if (res) {
          updateResponse(res)
        }
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
          loading={isUpdating}
          disabled={!isValid || isUpdating}
          loadingText="Updating..."
        >
          Update
        </Button>
        <FetchMessage
          message={responseRef.current.message}
          isSuccess={responseRef.current.isSuccess}
          isError={responseRef.current.isError}
        />
      </form>
    </div>
  );
}
