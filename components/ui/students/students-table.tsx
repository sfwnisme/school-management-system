// 'use client'
import { Suspense } from "react";
import StudentsData from "./students-data";
import Table from "../table/table";
import Tr from "../table/tr";
import Th from "../table/th";
import Thead from "../table/thead";
import Tbody from "../table/tbody";
import TableSkeleton from "../skeletons/table-skeleton";

export default function StudentsTable() {
  return (
    <div>
      <Suspense fallback={<TableSkeleton cols={5} />}>
        <Table rounded="md">
          <Thead>
            <Tr>
              <Th>id</Th>
              <Th>Name</Th>
              <Th>deparment</Th>
              <Th>address</Th>
              <Th>actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            <StudentsData />
          </Tbody>
        </Table>
      </Suspense>
    </div>
  );
}
