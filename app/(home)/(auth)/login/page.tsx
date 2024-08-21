"use client";
import LoginForm from "@/components/auth-components/login-form";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { HelpCircle, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <div>
      <LoginForm />
    </div>
  );
}
