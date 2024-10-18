import Button from "@/components/ui/button";
import TableLayer from "@/components/ui/table/table-layer";
import Title from "@/components/ui/title";
import { deleteStudent, getAllStudents } from "@/lib/actions";
import React from "react";

export default async function page() {
  const students = await getAllStudents();
  const studentsKeysAndNames = [
    {
      key: "studId",
      name: "id",
    },
    {
      key: "name",
      name: "name",
    },
    {
      key: "address",
      name: "address",
    },
    {
      key: "departmentName",
      name: "department",
    },
  ];

  return (
    <div>
      <Title title="All Students">
        <Button href="/dashboard/students/add">Create</Button>
      </Title>
      <TableLayer
        dataFunction={students}
        deleteFunction={deleteStudent}
        tableHeader={studentsKeysAndNames}
        route="students"
      />
    </div>
  );
}
