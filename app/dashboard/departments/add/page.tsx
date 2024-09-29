import Button from "@/components/ui/button";
import Title from "@/components/ui/title";
import React from "react";

export default function page() {
  return (
    <div>
      <Title title="Create Department">
        <Button tag="link" href="/dashboard/departments">
          Departements
        </Button>
      </Title>
      page
    </div>
  );
}
