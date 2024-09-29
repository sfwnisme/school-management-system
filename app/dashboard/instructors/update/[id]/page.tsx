import Button from "@/components/ui/button";
import InstructorUpdateForm from "@/components/ui/instructors/instructor-update-form";
import Title from "@/components/ui/title";
import { getInstructorById } from "@/lib/actions";
import React from "react";

type Props = {
  params: { id: number };
};

export default async function page(props: Props) {
  const instructorById = await getInstructorById(props.params.id);
  const instructorData = instructorById;
  console.log(instructorData);

  return (
    <div>
      <Title title="Update Instructor">
        <Button tag="link" href="/dashboard/instructors" value="Instructors" />
      </Title>
      <InstructorUpdateForm instructor={instructorData} />
    </div>
  );
}
