"use client";
import React, { useState } from "react";
import Input from "../input";
import { IResponse, IUser, YupUserResetPassword } from "@/definitions";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getAllUsers, resetUserPassword } from "@/lib/actions";
import Button from "../button";
import { yupUserResetPasswordSchema } from "@/lib/validation-schema-yup";
import Message from "../message";

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
  const email = props?.user.email;
  const [isPending, setIsPending] = useState(false);
  const [responseMessage, setResponseMessage] = useState<{
    statusCode: number;
    success: boolean | null;
    message: string;
  }>({
    statusCode: 0,
    success: null,
    message: "",
  });

  //--------------------------------
  // form submit
  //--------------------------------
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<YupUserResetPassword>({
    resolver: yupResolver(yupUserResetPasswordSchema),
    mode: "onChange",
    defaultValues: {
      email,
    },
  });

  const onSubmit: SubmitHandler<YupUserResetPassword> = async (data) => {
    setIsPending(true);
    try {
      console.log(email);
      const newPassword = {
        password: data.password,
        confirmPassword: data.confirmPassword,
        email: data.email,
      };
      const res= await resetUserPassword(newPassword);
      if (res) {
        setResponseMessage({
          statusCode: res.statusCode,
          success: res.success,
          message: res.message,
        });
      }
      await getAllUsers();
      // return res;
    } catch (error) {
      console.log("update user error", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="w-full md:max-w-[700px] md:w-auto mx-auto rounded border border-gray-300 p-4">
      <h1 className="mb-4 text-lg font-medium underline">
        Update user's password:
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
          loading={isPending}
          disabled={isPending || !isValid}
          loadingText="Updating..."
        >
          Update
        </Button>
        {responseMessage.message && (
          <div className="col-span-full">
            <Message variant={responseMessage.success ? "success" : "danger"}>
              {responseMessage.message}
            </Message>
          </div>
        )}
      </form>
    </div>
  );
}
