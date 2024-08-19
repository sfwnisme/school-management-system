import { HelpCircle, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    // <div className="container min-h-screen mx-auto grid grid-cols-2 place-content-center items-center max-w-[1200px] border-2">
    <div className="container h-screen mx-auto">
      <div className="h-full flex items-center">
        <div className="mx-auto flex gap-3 justify-center items-center max-w-[1200px] border-2 p-4">
          <article className="basis-1/3">
            <h1 className="text-3xl font-semibold text-center text-primary-500 mb-8">
              Signin
            </h1>
            <form className="grid grid-cols-4 gap-4 h-full">
              <input
                type="text"
                name="username"
                placeholder="User name"
                className="border-2 border-primary-300 rounded p-2 focus:border-primary-500 min-h-[40px] text-black col-span-full"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="border-2 border-primary-300 rounded p-2 focus:border-primary-500 min-h-[40px] text-black col-span-full"
              />
              <button
                type="submit"
                className="bg-primary-400 hover:bg-primary-500 text-white p-2 col-span-full col-start-1 rounded"
              >
                Login
              </button>
            </form>
            <div className="grid grid-cols-2 mt-6 justify-between">
              <Link
                href={""}
                className="text-blue-500 text-sm flex items-center gap-1"
              >
                <HelpCircle size={15} /> help reset my password
              </Link>
              <Link
                href={""}
                className="text-blue-500 text-sm flex items-center gap-1"
              >
                <Info size={15} /> Create your own account
              </Link>
            </div>
          </article>
          <article className="h-[400px] w-full bg-secondary-500 flex flex-col flex-wrap items-center justify-center p-8 basis-2/3">
            <h2 className="text-white text-2xl text-center font-semibold mb-4">
              Weclome back to the school management system
            </h2>
            <p className="text-white text-base text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A
              exercitationem excepturi animi eius, incidunt veritatis quaerat
              praesentium corporis sequi veniam dolor dignissimos, sapiente
            </p>
          </article>
        </div>
      </div>
    </div>
  );
}
