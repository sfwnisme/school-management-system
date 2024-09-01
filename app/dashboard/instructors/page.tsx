import InstructorsTable from "@/components/ui/instructors/instructors-table";
import Title from "@/components/ui/title";
import React from "react";

export default function page() {
  return (
    <div>
      <Title>Instructors</Title>
      <InstructorsTable />
    </div>
  );
}
