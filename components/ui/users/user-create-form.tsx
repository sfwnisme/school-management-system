"use client";
import { YupUserCreateInputs } from "@/definitions";
import { createUser } from "@/lib/actions";
import {
  yupUserCreateSchema,
  yupUserUpdateSchema,
} from "@/lib/validation-schema-yup";
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
//formdata
//form hook
//loading state
// input with message component
// delete button component
export default function UserCreateForm({}: Props) {
  const [isPending, setIsPending] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [nativeImage, setNativeImage] = useState<File>();

  const imagePreview = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setNativeImage(file);
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };
  console.log(nativeImage);

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
      return res;
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
    }
  };

  const create = async (e) => {
    e.preventDefault();
    const token = getCookie("token");
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const FD = new FormData(e.target);

    const imageFD = FD.get("image");
    console.log(imageFD?.name);
    console.log(FD.get("userName"));
    console.log(FD.get("fullName"));
    console.log(FD.get("email"));
    console.log(FD.get("password"));
    console.log(FD.get("confirmPassword"));
    console.log(FD.get("image"));

    const theData = {
      userName: FD.get("userName"),
      fullName: FD.get("fullName"),
      email: FD.get("email"),
      password: FD.get("password"),
      confirmPassword: FD.get("confirmPassword"),
      image: FD.get("image"),
    };
    try {
      // const res = await apiClient.post(endpoints.users.create, FD);
      const res = await createUser(theData);
      console.log(res);
      return res;
    } catch (error) {
      console.log("this is an error", error);
    }
  };

  return (
    <div>
      <div className="max-w-[700px]">
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
                errors.email?.message
                  ? "danger"
                  : isValid
                  ? "success"
                  : "initial"
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
            <Message variant="danger">
              {errors.confirmPassword?.message}
            </Message>
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
            loadingText="Updating..."
          >
            Update
          </Button>
          <img src={profileImage} />
        </form>
      </div>
    </div>
  );
}
