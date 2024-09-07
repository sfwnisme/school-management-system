import Button from "../button";
import { Edit, Trash } from "lucide-react";
import { getAllDepartments } from "@/lib/actions";
import Tr from "../table/tr";
import Td from "../table/td";
import { IDepartment } from "@/definitions";

export default async function DepartmentsData() {
  const departments = await getAllDepartments();
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

  if (departments?.data.data === undefined) content = noData;

  const data = departments?.data.data.map((department: IDepartment) => (
    <Tr key={department?.deptId}>
      <Td>{department?.deptId}</Td>
      <Td>{department?.name}</Td>
      <Td className=" flex gap-1 md:gap-2 py-2 px-4 whitespace-nowrap text-sm font-medium text-gray-500 ">
        <Button size="xs" variant="info" outline width="full">
          <Edit size={15} />
        </Button>
        <Button size="xs" variant="danger" outline width="full">
          <Trash size={15} />
        </Button>
      </Td>
    </Tr>
  ));

  if (departments?.data.data !== undefined) content = data;

  return <>{content}</>;
}
