"use client";
import { PanelLeft, PanelRight, Triangle } from "lucide-react";

// import { ToggleLeft } from "lucide-react";
// import { ToggleLeft } from "lucide";
import Image from "next/image";
import React from "react";
import AvatarWithList from "../ui/avatar-with-list";
import LogoLayout from "../ui/logo-layout";
import DrowerNavLinksLayout from "../ui/drawer-navlinks-layout";
import Nav from "../ui/nav";

export default function Drawer({ children }: childrenType) {
  const [toggleDrawer, setToggleDrawer] = React.useState<boolean>(false);
  function handleToggleDrawer() {
    setToggleDrawer((prev) => !prev);
  }

  return (
    <div className="grid grid-cols-20 min-h-screen relative">
      {toggleDrawer ? (
        <div
          className={`bg-white col-span-10 sm:col-span-7 md:col-span-5 lg:col-span-4 p-2 border-r overflow-x-hidden`}
        >
          <DrowerNavLinksLayout
            toggleDrawer={toggleDrawer}
            setToggleDrawer={setToggleDrawer}
          />
        </div>
      ) : null}
      <div
        className={`${
          toggleDrawer
            ? "col-span-10 sm:col-span-13 md:col-span-15 lg:col-span-16"
            : "col-span-full"
        } h-full w-full`}
      >
        <Nav toggleDrawer={toggleDrawer} setToggleDrawer={setToggleDrawer} />
        <article className="px-4">{children}</article>
      </div>
    </div>
  );
}
