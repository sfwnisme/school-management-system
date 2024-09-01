// 'use client'
import { Suspense } from "react";
import DepartmentsData from "./departments-data";
import Table from "../table/table";
import Tr from "../table/tr";
import Th from "../table/th";
import Thead from "../table/thead";
import Tbody from "../table/tbody";
import TableSkeleton from "../skeletons/table-skeleton";

export default function DepartmentsTable() {
  return (
    <div>
      <Suspense fallback={<TableSkeleton cols={3} rows={5} />}>
        <Table rounded="md">
          <Thead>
            <Tr>
              <Th>id</Th>
              <Th>Name</Th>
              <Th>actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            <DepartmentsData />
          </Tbody>
        </Table>
      </Suspense>
    </div>
  );
}
//address, country, email, fullName
