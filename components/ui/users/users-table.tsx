// 'use client'
import { Suspense } from "react";
import UsersData from "./users-data";
import UsersTableSkeleton from "../skeletons/users-table-skeleton";
import Table from "../table/table";
import Tr from "../table/tr";
import Th from "../table/th";
import Thead from "../table/thead";
import Tbody from "../table/tbody";
import { useGetCookie } from "@/hooks/use-cookies";

export default function UsersTable() {
  const cookie = useGetCookie("token");

  console.log(cookie);

  return (
    <div>
      <Suspense fallback={<UsersTableSkeleton />}>
        <Table rounded="md">
          <Thead>
            <Tr>
              <Th>id</Th>
              <Th>Name</Th>
              <Th>Roles</Th>
              <Th>email</Th>
              <Th>Address</Th>
              <Th>Phone</Th>
              <Th>actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            <UsersData />
          </Tbody>
        </Table>
      </Suspense>
    </div>
  );
}
//address, country, email, fullName
