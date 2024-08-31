"use client";
import React, { FormEvent, useEffect } from "react";
import Input from "../ui/input";
import Button from "../ui/button";
import { User } from "lucide-react";
import Link from "next/link";
import { handleSignIn } from "@/lib/actions";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/lib/validation-schema-yup";
import { useGetCookie } from "@/hooks/use-cookies";
import { getCookie } from "cookies-next";
import { LoginInputTypes } from "@/definitions";

type Inputs = {
  username: string;
  password: string;
};

export default function LoginForm() {
  const [loading, setLoading] = React.useState(0);
  const [serverMessage, setServerMessage] = React.useState("");
console.log(getCookie('token'))
  //-------------
  const {
    register,
    handleSubmit,
    watch,
    formState: {
      errors,
      isValid,
      isDirty,
      dirtyFields,
      touchedFields,
      isValidating,
    },
  } = useForm<LoginInputTypes>({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
    // reValidateMode: "onChange",
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("final data", data);
    console.log("errrrrrror", errors);
    setLoading(1);
    try {
      const loginCredentials = {
        username: data?.username,
        password: data?.password,
      };
      let response = await handleSignIn(
        loginCredentials?.username as string,
        loginCredentials?.password as string
      );
      if (response?.message) setServerMessage(response?.message);
    } catch (error) {
      console.error("error from login-form.tsx", error);
    } finally {
      setLoading(0);
    }
  };
  console.log("isvalid", isValid);
  console.log("is dirty", isDirty);
  console.log("dirty fields", isValidating);

  //-------------

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
          {/* <input
            type="text"
            // name="username"
            placeholder="Your username"
            {...register("username")}
          /> */}
          <Input
            type="username"
            // name="username"
            placeholder="Your username"
            styles="col-span-full"
            variant={
              errors.password?.message
                ? "danger"
                : isValid
                ? "success"
                : "initial"
            }
            {...register("username")}
          />
          <small className="text-red-500">{errors.username?.message}</small>
          <Input
            type="password"
            // name="password"
            placeholder="Your password"
            styles="col-span-full"
            variant={
              errors.password?.message
                ? "danger"
                : isValid
                ? "success"
                : "initial"
            }
            {...register("password")}
          />
          <small className="text-red-500">{errors.password?.message}</small>
          <Link
            href={""}
            className="text-gray-400 hover:text-gray-500 text-xs lg:text-sm flex items-center justify-end gap-1 col-start-2 col-span-3 mb-4"
          >
            help reset my password
          </Link>
          <Button
            type="submit"
            value={"login"}
            disabled={loading === 0 ? false : true}
            loading={loading}
          />
          {serverMessage && (
            <small className="text-red-500 col-span-full">
              server message: {serverMessage}
            </small>
          )}
        </form>
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
