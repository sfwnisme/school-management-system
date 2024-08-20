"use client";
import AvatarWithList from "@/components/ui/avatar-with-list";
import LogoLayout from "@/components/ui/logo-layout";
import Nav from "@/components/ui/nav";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div>
      <p>overview page</p>
      <Link href={"/dashboard"} className="text-info">
        dashboard
      </Link>
    </div>
  );
}
