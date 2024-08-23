"use client";
import React from "react";
import UsersData from "./users-data";

export default function UsersTable() {
  // const users = await getAllUsers();

  return (
    <div>
      UsersTable
      <div className="table-container min-w-full overflow-x-auto p- border rounded-md">
        <table className="w-full divide-y divide-gray-200">
          <thead className="divide-x bg-gray-50">
            <th className="p-4 text-start text-xs font-bold text-gray-900 uppercase ">
              id
            </th>
            <th className="p-4 text-start text-xs font-bold text-gray-900 uppercase ">
              Name
            </th>
            <th className="p-4 text-start text-xs font-bold text-gray-900 uppercase ">
              email
            </th>
            <th className="p-4 text-start text-xs font-bold text-gray-900 uppercase ">
              country
            </th>
            <th className="p-4 text-start text-xs font-bold text-gray-900 uppercase ">
              address
            </th>
            <th className="p-4 text-start text-xs font-bold text-gray-900 uppercase ">
              actions
            </th>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <UsersData />
          </tbody>
        </table>
      </div>
    </div>
  );
}
//address, country, email, fullName
