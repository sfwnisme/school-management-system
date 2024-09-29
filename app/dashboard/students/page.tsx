import Button from "@/components/ui/button";
import StudentsTable from "@/components/ui/students/students-table";
import TableLayer from "@/components/ui/table-layer";
import Title from "@/components/ui/title";
import { deleteStudent, getAllStudents } from "@/lib/actions";
import React from "react";

export default async function page() {
  const students = await getAllStudents();
  // {
  //   studId: 1,
  //   name: 'Ahmed Mohamed',
  //   address: '123 Street',
  //   departmentName: null
  // },
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
        <Button tag="link" href="/dashboard/students/create">
          Create
        </Button>
      </Title>
      {/* <StudentsTable /> */}
      <TableLayer
        dataFunction={students}
        deleteFunction={deleteStudent}
        tableHeader={studentsKeysAndNames}
        route="students"
      />
    </div>
  );
}
