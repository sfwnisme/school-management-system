import StudentsTable from "@/components/ui/students/students-table";
import Title from "@/components/ui/title";
import React from "react";

export default function page() {
  return (
    <div>
      <Title>Students</Title>
      <StudentsTable />
    </div>
  );
}
