"use client";
import React from "react";
import DrowerNavLinksLayout from "../ui/drawer-navlinks-layout";
import Nav from "../ui/nav";

export default function Drawer({ children }: childrenType) {
  const [toggleDrawer, setToggleDrawer] = React.useState<boolean>(true);

  return (
    <div className="grid grid-cols-20 h-screen">
      {toggleDrawer ? (
        <div
          className={`bg-white col-span-10 sm:col-span-7 md:col-span-6 lg:col-span-5 xl:col-span-4 2xl:col-span-3 border-r overflow-x-hidden`}
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
            ? "col-span-10 sm:col-span-13 md:col-span-14 lg:col-span-15 xl:col-span-16 2xl:col-span-17"
            : "col-span-full"
        } h-full w-full`}
      >
        <Nav
          toggleDrawer={toggleDrawer}
          setToggleDrawer={setToggleDrawer}
          isDashboard={true}
        />
        <article className="container py-10 h-[calc(100vh-91px)] overflow-y-scroll relative">
          {children}
        </article>
      </div>
    </div>
  );
}
