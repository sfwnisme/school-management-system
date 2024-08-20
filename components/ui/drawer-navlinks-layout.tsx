import React from "react";
import { navLinks } from "../../lib/nav-links";
import Link from "next/link";
import LogoLayout from "./logo-layout";
import { PanelLeft } from "lucide-react";

type Props = {
  toggleDrawer: boolean;
  setToggleDrawer: UpdateStateType;
};

export default function DrowerNavLinksLayout(props: Props) {
  const { toggleDrawer, setToggleDrawer } = props;

  function handleToggleDrawer() {
    setToggleDrawer((prev) => !prev);
  }

  const navLinksData = navLinks.map((link) => (
    <Link
      href={link?.href}
      key={link?.href}
      className="text-primary-300 hover:text-primary-500 hover:bg-secondary-50/30 font-medium rounded-sm mx-px my-1 p-3 flex items-end gap-1 duration-150 text-sm md:text-base"
    >
      {link?.icon ? <link.icon /> : <div className="h-[25px] w-[25px]" />}
      <p className="first-letter:capitalize">{link?.title}</p>
    </Link>
  ));

  return (
    <aside className="">
      <div className="px-3 py-4 flex items-center justify-between">
        <LogoLayout height={30} width={30} hasText={true} />
        <PanelLeft
          size={30}
          className="text-primary-300 cursor-pointer"
          onClick={handleToggleDrawer}
        />
      </div>
      <div className="flex flex-col flex-wrap items-stretch justify-start">
        {navLinksData}
      </div>
    </aside>
  );
}
