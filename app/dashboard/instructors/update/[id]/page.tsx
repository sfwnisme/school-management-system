import Button from "@/components/ui/button";
import InstructorUpdateForm from "@/components/ui/instructors/instructor-update-form";
import Title from "@/components/ui/title";
import { IClientResponse, IDepartment, IInstructor } from "@/definitions";
import { getAllDepartments, getInstructorById } from "@/lib/actions";
import React from "react";

type Props = {
  params: { id: number };
};
export default async function page(props: Props) {
  const id = Number(props.params.id)
  const instructorById = await getInstructorById(id) as IClientResponse<IInstructor>;
  const departments = await getAllDepartments() as IClientResponse<IDepartment[]>;
  return (
    <div>
      <Title title="Update Instructor">
        <Button tag="link" href="/dashboard/instructors" value="Instructors" />
      </Title>
      <InstructorUpdateForm instructor={instructorById} departments={departments} />
    </div>
  );
}
