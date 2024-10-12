import Button from "@/components/ui/button";
// import InstructorsTable from "@/components/ui/instructors/instructors-table";
import TableLayer from "@/components/ui/table/table-layer";
// import Title from "@/components/ui/title";
import { deleteInstructor, getAllInstructors } from "@/lib/actions";
import React from "react";
import Title from "../../../components/ui/title";

export default async function page() {
  const instructors = await getAllInstructors();
  // {
  //   instId: 1,
  //   name: 'Eng. Safwan Mohamed',
  //   address: '123 Professor St',
  //   position: 'Professor',
  //   imagePath: null,
  //   supervisorId: null,
  //   salary: 70000,
  //   deptId: 3
  const instructorsKeysAndNames = [
    {
      key: "instId",
      name: "id",
    },
    {
      key: "name",
      name: "name",
    },
    {
      key: "position",
      name: "position",
    },
    {
      key: "salary",
      name: "salary",
    },
  ];
  return (
    <div>
      <Title title="All Instructors">
        <Button tag="link" href="/dashboard/instructors/create">
          Create
        </Button>
      </Title>
      <TableLayer
        dataFunction={instructors}
        deleteFunction={deleteInstructor}
        tableHeader={instructorsKeysAndNames}
        route="instructors"
      />
    </div>
  );
}
