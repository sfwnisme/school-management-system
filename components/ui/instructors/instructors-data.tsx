import Button from "../button";
import { Edit, Trash } from "lucide-react";
import { getAllInstructors } from "@/lib/actions";
import Tr from "../table/tr";
import Td from "../table/td";
import { IInstructor } from "@/definitions";

export default async function InstructorsData() {
  const instructors = await getAllInstructors();
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

  if (instructors?.data.data === undefined) content = noData;

  function currency(currency: number | string, type?: "SAR" | "EGY" | "YER") {
    const availibleCurrencies = {
      SAR: "SAR",
      EGY: "EGY",
      YER: "YER",
    };
    const content = (
      <span>
        <sup className="text-gray-400">
          {availibleCurrencies[type || "SAR"]}
        </sup>
        {currency.toLocaleString()}
      </span>
    );
    return content;
  }

  const data = instructors?.data.data.map((instructor: IInstructor) => (
    <Tr key={instructor?.instId}>
      <Td>{instructor?.instId}</Td>
      <Td>{instructor?.name}</Td>
      <Td>{instructor?.position}</Td>
      <Td>{currency(instructor?.salary)}</Td>
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

  if (instructors?.data.data !== undefined) content = data;

  return <>{content}</>;
}
