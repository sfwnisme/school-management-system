import Button from "../button";
import { Edit, Trash } from "lucide-react";
import { getAllStudents } from "@/lib/actions";
import Tr from "../table/tr";
import Td from "../table/td";
import { IStudent } from "@/definitions";

export default async function StudentsData() {
  const students = await getAllStudents();
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

  if (students?.data.data === undefined) content = noData;

  const data = students?.data.data.map((student: IStudent) => (
    <Tr key={student?.studId}>
      <Td>{student?.studId}</Td>
      <Td>{student?.name}</Td>
      <Td>{student?.departmentName}</Td>
      <Td>{student?.address}</Td>
      <Td className=" flex gap-1 md:gap-2 py-2 px-4 whitespace-nowrap text-sm font-medium text-gray-500 ">
        <Button size="xs" outline variant="info" width="full">
          <Edit size={15} />
        </Button>
        <Button size="xs" outline variant="danger" width="full">
          <Trash size={15} />
        </Button>
      </Td>
    </Tr>
  ));

  if (students?.data.data !== undefined) content = data;

  return <>{content}</>;
}
