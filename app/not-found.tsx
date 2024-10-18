import Button from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-xl md:text-5xl text-gray-600 font-semibold text-center">
        Not Small Oops It&apos;s Absolutly a Big Oops!
      </h1>
      <p className="text-gray-400">this page is not found</p>
      <Button href="/dashboard" variant="link">
        Go back
      </Button>
    </div>
  );
}
