import Button from "@/components/ui/button";
import DepartmentsTable from "@/components/ui/departments/departments-table";
import TableLayer from "@/components/ui/table-layer";
import Title from "@/components/ui/title";
import { deleteDepartment, getAllDepartments } from "@/lib/actions";
import React from "react";

export default async function page() {
  const departments = await getAllDepartments() ;

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
        <Button tag="link" href="/dashboard/departments/create">
          Create
        </Button>
      </Title>
      {/* <DepartmentsTable /> */}
      <TableLayer
        dataFunction={departments}
        deleteFunction={deleteDepartment}
        tableHeader={departmentsKeysAndNames}
        route="departments"
      />
    </div>
  );
}
