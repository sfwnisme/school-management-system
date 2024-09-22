'use client'
import { Suspense } from "react";
import UsersData from "./users-data";
import Table from "../table/table";
import Tr from "../table/tr";
import Th from "../table/th";
import Thead from "../table/thead";
import Tbody from "../table/tbody";
import TableSkeleton from "../skeletons/table-skeleton";
import { IUser } from "@/definitions";
type Props = {
  users: IUser[];
  currentUser: IUser;
};
export default function UsersTable(props: Props) {
  return (
    <div>
      <Suspense fallback={<TableSkeleton cols={6} />}>
        <Table rounded="md">
          <Thead>
            <Tr>
              <Th>id</Th>
              <Th>image</Th>
              <Th>Name</Th>
              <Th>Roles</Th>
              <Th>email</Th>
              <Th>actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            <UsersData users={props.users} currentUser={props.currentUser} />
          </Tbody>
        </Table>
      </Suspense>
    </div>
  );
}
//address, country, email, fullName
