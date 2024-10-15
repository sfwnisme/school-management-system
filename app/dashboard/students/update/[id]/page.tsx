import Button from "@/components/ui/button";
import Title from "@/components/ui/title";
import { IClientResponse, IDepartment, IStudent } from "@/definitions";
import { getAllDepartments, getStudentById } from "@/lib/actions";
import StudentUpdateForm from "../student-update-form";

type Props = {
  params: { id: number };
};
export default async function page(props: Props) {
  const id = Number(props.params.id);
  const student = (await getStudentById(id)) as IClientResponse<IStudent>;
  const departments = (await getAllDepartments()) as IClientResponse<
    IDepartment[]
  >;
  return (
    <div>
      <Title title="Update Students">
        <Button>Students</Button>
      </Title>
      <StudentUpdateForm departments={departments} student={student} />
    </div>
  );
}
