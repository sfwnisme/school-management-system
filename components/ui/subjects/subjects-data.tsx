import Button from "../button";
import { Edit, Trash } from "lucide-react";
import { getAllSubjects } from "@/lib/actions";
import Tr from "../table/tr";
import Td from "../table/td";
import { ISubject } from "@/definitions";
import ErrorMessage from "../error-message";

export default async function SubjectsData() {
  const subjects = await getAllSubjects();
  console.log(subjects?.data.data);
  let content;

  const noData = (
    <Tr>
      <Td
        className="text-center bg-gray-50 text-gray-600 font-bold"
        colSpan={10}
      >
        No data!
      </Td>
      {/* <div>No data</div> */}
    </Tr>
  );

  // subjectId: 2,
  //     subjectName: 'Physics',
  //     departments: [
  //       { departmentId: 2, departmentName: 'Physics Department' }
  // ]

  if (subjects?.data.data === undefined) content = noData;

  const data = subjects?.data.data.map((subject: ISubject) => (
    <Tr key={subject?.subjectId}>
      <Td>{subject?.subjectId}</Td>
      <Td>{subject?.subjectName}</Td>
      <Td>{subject?.departments.map((dep) => dep?.departmentName + ",")}</Td>
      <Td className=" flex gap-1 md:gap-2 py-2 px-4 whitespace-nowrap text-sm font-medium text-gray-500 ">
        <Button size="xs" variant="outline-info" width="full">
          <Edit size={15} />
        </Button>
        <Button size="xs" variant="outline-danger" width="full">
          <Trash size={15} />
        </Button>
      </Td>
    </Tr>
  ));

  if (subjects?.data.data !== undefined) content = data;

  return <>{content}</>;
}
