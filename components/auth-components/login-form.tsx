"use client";
import React, { FormEvent, useEffect } from "react";
import Input from "../ui/input";
import Button from "../ui/button";
import { HelpCircle, User } from "lucide-react";
import Link from "next/link";
import { handleSignIn } from "@/lib/actions";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/lib/validation-schema-yup";
import { IResponse, LoginInputTypes } from "@/definitions";
import Message from "../ui/message";

type Inputs = {
  username: string;
  password: string;
};

export default function LoginForm() {
  const [loading, setLoading] = React.useState(false);
  const [serverMessage, setServerMessage] = React.useState("");
  const [responseMessage, setResponseMessage] = React.useState<{
    statusCode: number;
    success: boolean | null;
    message: string;
  }>({
    statusCode: 0,
    success: null,
    message: "",
  });

  console.log(serverMessage);
  //-------------
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<LoginInputTypes>({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const errorMessage = (value: keyof LoginInputTypes) => {
    let message = errors[`${value}`]?.message;
    if (message !== undefined) return message;
    return null;
  };
  console.log(errorMessage("password"));

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    try {
      const loginCredentials = {
        username: data?.username,
        password: data?.password,
      };
      const res = await handleSignIn(
        loginCredentials?.username as string,
        loginCredentials?.password as string
      );
      if (res) {
        setResponseMessage({
          statusCode: res.statusCode,
          success: res.success,
          message: res.message,
        });
      }
    } catch (error) {
      console.error("error from login-form.tsx", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex flex-col-reverse  md:flex-row gap-3 justify-center items-center max-w-[1200px] shadow-lg shadow-gray-50 rounded overflow-hidden">
      <article className="md:basis-1/2 p-4 w-full">
        <h1 className="text-3xl font-semibold text-center text-gray-600 mb-8 flex flex-col gap-2 items-center justify-center">
          <User
            className="bg-gray-900 text-white rounded-full stroke-1 "
            size={50}
          />
          Signin
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-4 gap-4 h-full w-full"
        >
          <div className="col-span-full">
            <Input
              type="name"
              placeholder="Your username"
              variant={
                errors.username?.message
                  ? "danger"
                  : isValid
                  ? "success"
                  : "initial"
              }
              {...register("username")}
            />
            <Message variant="danger">{errors.username?.message}</Message>
          </div>
          <div className="col-span-full">
            <Input
              type="password"
              placeholder="Your password"
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
          <Link
            href={""}
            className="text-gray-400 hover:text-gray-500 text-xs lg:text-sm flex items-center justify-end gap-1 col-start-2 col-span-3 mb-4"
          >
            help reset my password
          </Link>
          <Button
            type="submit"
            value={"login"}
            disabled={!isValid || loading ? true : false}
            loading={loading}
            size="sm"
          />
        </form>
        {responseMessage.message && (
          <div className="col-span-full">
            <Message variant={responseMessage.success ? "success" : "danger"}>
              {responseMessage.message}
            </Message>
          </div>
        )}
        <Link
          href={""}
          className="text-gray-400 hover:text-gray-500 text-xs lg:text-sm flex items-center justify-center gap-1 col-span-full mt-4"
        >
          Create your own account
        </Link>
      </article>
      <article className="h-[400px] w-full bg-gray-900 flex flex-col flex-wrap items-center justify-center p-8 basis-1/2">
        <h2 className="text-white text-4xl text-center font-bold mb-4">
          Welcome back
        </h2>
        <p className="text-white text-sm text-center font-light">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A
          exercitationem excepturi animi eius, incidunt veritatis quaerat
          praesentium corporis sequi veniam dolor dignissimos, sapiente
        </p>
      </article>
    </div>
  );
}
