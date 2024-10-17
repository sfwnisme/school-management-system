import Button from "@/components/ui/button";
import TableLayer from "@/components/ui/table/table-layer";
import Title from "@/components/ui/title";
import { deleteDepartment, getAllDepartments } from "@/lib/actions";
import React from "react";

export default async function page() {
  const departments = await getAllDepartments();
  console.log(departments);

  const departmentsKeysAndNames = [
    {
      key: "deptId",
      name: "id",
    },
    {
      key: "name",
      name: "name",
    },
  ];
  return (
    <div>
      <Title title="All Departments">
        <Button href="/dashboard/departments/add">Create</Button>
      </Title>
      <TableLayer
        dataFunction={departments}
        deleteFunction={deleteDepartment}
        tableHeader={departmentsKeysAndNames}
        route="departments"
      />
    </div>
  );
}
