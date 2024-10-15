import NotFound from "@/app/not-found";
import Button from "@/components/ui/button";
import Title from "@/components/ui/title";
import { IClientResponse, ISubject } from "@/definitions";
import { getSubjectById } from "@/lib/actions";
import React from "react";
import SubjectUpdateForm from "../subject-update-form";

// export const revalidate = 2;
type Props = {
  params: {
    id: string;
  };
};
export default async function page(props: Props) {
  const id = Number(props?.params.id);
  const subjectById = await getSubjectById(id) as IClientResponse<ISubject>

  console.log(subjectById)

  if (!subjectById?.data || subjectById?.isError) return NotFound();
  return (
    <div>
      <Title title="Update Subject">
        <Button tag="link" href="/dashboard/subjects" value="Subjects" />
      </Title>
      <SubjectUpdateForm subject={subjectById} />
    </div>
  );
}
