// 'use client'
import { Suspense } from "react";
import UsersData from "./users-data";
import Loading from "../spin-loading";

export default function UsersTable() {
  return (
    <div>
      <div>
        <div className="table-container min-w-full overflow-x-auto p- border rounded-md">
          <Suspense fallback={<Loading />}>
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr className="divide-x divide-gray-200">
                  <th className="p-4 text-start text-xs font-bold text-gray-900 uppercase ">
                    id
                  </th>
                  <th className="p-4 text-start text-xs font-bold text-gray-900 uppercase ">
                    Name
                  </th>
                  <th className="p-4 text-start text-xs font-bold text-gray-900 uppercase ">
                    Roles
                  </th>
                  <th className="p-4 text-start text-xs font-bold text-gray-900 uppercase ">
                    email
                  </th>
                  <th className="p-4 text-start text-xs font-bold text-gray-900 uppercase ">
                    Address
                  </th>
                  <th className="p-4 text-start text-xs font-bold text-gray-900 uppercase ">
                    Phone
                  </th>
                  <th className="p-4 text-start text-xs font-bold text-gray-900 uppercase ">
                    actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <UsersData />
              </tbody>
            </table>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
//address, country, email, fullName
