import Button from "@/components/ui/button";
import SubjectsTable from "@/components/ui/subjects/subjects-table";
import TableLayer from "@/components/ui/table-layer";
import Title from "@/components/ui/title";
import { ITableHead } from "@/definitions";
import { deleteSubject, getAllSubjects } from "@/lib/actions";
import { Plus } from "lucide-react";
import React from "react";

// {
//   subjectId: 2,
//   subjectName: 'Physics',
//   departments: [
//     { departmentId: 2, departmentName: 'Physics Department' }
//   ]
// },
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
];
export default async function page() {
  const subjects = await getAllSubjects();
  return (
    <div>
      <Title title="All Subjects">
        <Button tag="link" href="/dashboard/subjects/create">
          <Plus />
        </Button>
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
