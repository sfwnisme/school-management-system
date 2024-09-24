import Button from "@/components/ui/button";
import InstructorsTable from "@/components/ui/instructors/instructors-table";
import TableLayer from "@/components/ui/table-layer";
import Title from "@/components/ui/title";
import { getAllInstructors } from "@/lib/actions";
import React from "react";

export default async function page() {
  const instructors = await getAllInstructors();
  console.log(instructors);
  //   instId: 3,
  //   name: 'Dr. Sarah Khaled',
  //   address: '345 Professor St',
  //   position: 'Assistant Professor',
  //   imagePath: null,
  //   supervisorId: null,
  //   salary: 60000,
  //   deptId: 2
  // },
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
          Add Instructor
        </Button>
      </Title>
      <TableLayer
        dataFunction={instructors}
        tableHeader={instructorsKeysAndNames}
      />
      {/* <InstructorsTable /> */}
    </div>
  );
}
