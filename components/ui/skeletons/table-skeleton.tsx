// "use client";
import React from "react";
import Skeleton from "./skeleton";
import Tr from "../table/tr";
import Table from "../table/table";
import Thead from "../table/thead";
import Tbody from "../table/tbody";
import Td from "../table/td";

type Props = {
  cols?: number;
  rows?: number;
};

export default function TableSkeleton(props: Props) {
  const cols = new Array(props?.cols || 8).fill(null);
  const rows = new Array(props?.rows || 8).fill(null);

  const tableData = cols?.map((_, idxx) => (
    <Td key={idxx}>
      <Skeleton />
    </Td>
  ));

  const body = rows?.map((_, idx) => <Tr key={idx}>{tableData}</Tr>);

  const head = cols.map((_, idx) => (
    <th
      className="p-4 text-start text-xs font-bold text-gray-900 uppercase "
      key={idx}
    >
      <Skeleton />
    </th>
  ));

  return (
    <Table>
      <Thead>
        <Tr>{head}</Tr>
      </Thead>
      <Tbody>{body}</Tbody>
    </Table>
  );
}
