import Button from "@/components/ui/button";
import TableLayer from "@/components/ui/table/table-layer";
import Title from "@/components/ui/title";
import { ITableHead } from "@/definitions";
import { deleteSubject, getAllSubjects } from "@/lib/actions";
import { Plus } from "lucide-react";
import React from "react";

const subjectsKeysAndNames: ITableHead[] = [
  {
    key: "subjectId",
    name: "id",
    arr: [],
  },
  {
    key: "subjectName",
    name: "subject",
    arr: [],
  },
  {
    key: "departments",
    name: "departments",
    arr: [
      {
        key: "deparmentId",
        name: "department id",
      },
      {
        key: "departmentName",
        name: "department name",
      },
    ],
  },
  {
    key: "period",
    name: "period",
    arr: [],
  },
];
export default async function page() {
  const subjects = await getAllSubjects();
  return (
    <div>
      <Title title="All Subjects">
        <Button href="/dashboard/subjects/add">create</Button>
      </Title>
      <TableLayer
        dataFunction={subjects}
        deleteFunction={deleteSubject}
        tableHeader={subjectsKeysAndNames}
        route="subjects"
      />
    </div>
  );
}
