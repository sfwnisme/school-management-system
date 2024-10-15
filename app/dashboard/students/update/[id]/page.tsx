import Button from "@/components/ui/button";
import InstructorUpdateForm from "../instructor-update-form";
import Title from "@/components/ui/title";
import { IClientResponse, IDepartment, IInstructor, IStudent } from "@/definitions";
import { getAllDepartments, getInstructorById, getStudentById } from "@/lib/actions";
import React from "react";
import StudentUpdateForm from "../student-update-form";

type Props = {
  params: { id: number };
};
export default async function page(props: Props) {
  const id = Number(props.params.id)
  const student = await getStudentById(id) as IClientResponse<IStudent>;
  const departments = await getAllDepartments() as IClientResponse<IDepartment[]>;
  return (
    <div>
      <Title title="Update Instructor">
        <Button tag="link" href="/dashboard/instructors" value="Instructors" />
      </Title>
      <StudentUpdateForm departments={departments} student={student} />
    </div>
  );
}
