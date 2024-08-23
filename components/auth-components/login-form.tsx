"use client";
import React, { FormEvent, useEffect } from "react";
import Input from "../ui/input";
import Button from "../ui/button-with-link";
import { User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { handleSignIn } from "@/lib/actions";

export default function LoginForm() {
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    console.log("loading from use effect", loading);
  }, [loading]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const FD = new FormData(e.currentTarget);
      const loginCredentials = {
        username: FD.get("username"),
        password: FD.get("password"),
        rememberme: true,
      };
      await handleSignIn(
        loginCredentials?.username as string,
        loginCredentials?.password as string,
        loginCredentials?.rememberme
      );
      // router.push("/dashboard");
      console.log("user name and password data", loginCredentials);
    } catch (error) {
      console.error("error from login-form.tsx", error);
    } finally {
      setLoading(false);
    }
  }
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
          onSubmit={handleSubmit}
          className="grid grid-cols-4 gap-4 h-full w-full"
        >
          <Input
            type="text"
            name="username"
            placeholder="Your username"
            styles="col-span-full"
          />
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            styles="col-span-full"
          />
          <Link
            href={""}
            className="text-gray-400 hover:text-gray-500 text-xs lg:text-sm flex items-center justify-end gap-1 col-start-2 col-span-3 mb-4"
          >
            help reset my password
          </Link>
          {/* <React.Suspense fallback="loading"> */}
          <Button
            type="submit"
            value={"login"}
            disabled={loading}
            loading={loading}
          />
          {/* </React.Suspense> */}
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
