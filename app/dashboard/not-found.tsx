import Button from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-xl md:text-5xl text-gray-600 font-semibold text-center">
        Oops!
      </h1>
      <p className="text-gray-400">you are not authorized to access this page</p>
      <Button href="/dashboard" variant="link">
        Go back
      </Button>
    </div>
  );
}
