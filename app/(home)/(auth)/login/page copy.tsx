// "use client";
import LoginForm from "@/components/login-form";
import { Suspense } from "react";
import Loading from "./loading";

export default async function Home() {
  return (
    <main>
      <Suspense fallback={<Loading />}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
