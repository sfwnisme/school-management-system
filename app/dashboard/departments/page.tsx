import DepartmentsTable from "@/components/ui/departments/departments-table";
import Title from "@/components/ui/title";
import React from "react";

export default function page() {
  return (
    <div>
      <Title title="All Departments"></Title>
      <DepartmentsTable />
    </div>
  );
}
