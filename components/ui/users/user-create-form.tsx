"use client";
// import Image from 'next'
import { YupUserCreateInputs } from "@/definitions";
import { createUser, getAllUsers } from "@/lib/actions";
import { yupUserCreateSchema } from "@/lib/validation-schema-yup";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { ChangeEvent, FormEventHandler, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../button";
import FileInput from "../file-input";
import Message from "../message";
import Input from "../input";
import { apiClient, endpoints } from "@/lib/endpoints";
import { getCookie } from "cookies-next";
import { appendToFormData } from "@/lib/utils";

type Props = {};
export default function UserCreateForm({}: Props) {
  const [isPending, setIsPending] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [nativeImage, setNativeImage] = useState<File>();
  const [responseMessage, setResponseMessage] = useState<{
    statusCode: number;
    success: boolean | null;
    message: string;
  }>({
    statusCode: 0,
    success: null,
    message: "",
  });

  const imagePreview = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setNativeImage(file);
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<YupUserCreateInputs>({
    resolver: yupResolver(yupUserCreateSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<YupUserCreateInputs> = async (data) => {
    setIsPending(true);

    const { userName, fullName, email, password, confirmPassword, image } =
      data;

    const FD = new FormData();
    FD.append("userName", userName);
    FD.append("fullName", fullName);
    FD.append("email", email);
    FD.append("password", password);
    FD.append("confirmPassword", confirmPassword);
    FD.append("image", image[0]);

    try {
      const res = await createUser(FD);
      console.log(res);
      if (res) {
        setResponseMessage({
          statusCode: res?.statusCode,
          success: res?.success,
          message: res?.message,
        });
      }
      await getAllUsers();
      return res;
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="w-full md:max-w-[700px] md:w-auto mx-auto rounded border border-gray-300 p-4">
      <div className="size-20 border border-gray-300 rounded mx-auto mb-8 overflow-hidden">
        {/*  eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={
            profileImage ||
            "https://www.transparentpng.com/thumb/user/gray-user-profile-icon-png-fP8Q1P.png"
          }
          alt="user image"
          className="size-full object-cover aspect-square"
        />
      </div>
      <form
        // onSubmit={create}
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
        <div className="col-span-full md:col-span-full">
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
        <div className="col-span-full md:col-span-2">
          <Input
            type="text"
            placeholder="Your Password"
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
            type="text"
            placeholder="Confirm your password"
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
        <div className="col-span-full">
          <FileInput
            type="file"
            // name="imagePath"
            placeholder="Your image"
            {...register("image")}
            onChange={imagePreview}
            accept="image/*"
          />
        </div>
        <Button
          variant="info"
          type="submit"
          loading={isPending}
          disabled={isPending}
          loadingText="Creating..."
        >
          Create
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
