"use client";

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
