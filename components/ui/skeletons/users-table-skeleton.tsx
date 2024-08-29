// "use client";
import React from "react";
import Skeleton from "./skeleton";

export default function UsersTableSkeleton() {
  const dummyArray = new Array(8).fill(null);

  const rowSkeleton = dummyArray?.map((row, idx) => (
    <tr className="divide-x" key={idx}>
      <td className="py-2 px-4 whitespace-nowrap text-sm font-medium text-gray-500 ">
        <Skeleton />
      </td>
      <td className="py-2 px-4 whitespace-nowrap text-sm font-medium text-gray-500 ">
        <Skeleton />
      </td>
      <td className="py-2 px-4 whitespace-nowrap text-sm font-medium text-gray-500 ">
        <Skeleton />
      </td>
      <td className="py-2 px-4 whitespace-nowrap text-sm font-medium text-gray-500 ">
        <Skeleton />
      </td>
      <td className="py-2 px-4 whitespace-nowrap text-sm font-medium text-gray-500 ">
        <Skeleton />
      </td>
      <td className="py-2 px-4 whitespace-nowrap text-sm font-medium text-gray-500 ">
        <Skeleton />
      </td>
      <td className=" flex gap-2 py-2 px-4 whitespace-nowrap text-sm font-medium text-gray-500 ">
        <Skeleton color="bg-blue-200" />
        <Skeleton color="bg-red-200" />
      </td>
    </tr>
  ));

  return (
    <table className="w-full divide-y divide-gray-200">
      <thead className="bg-gray-100">
        <tr className="divide-x divide-gray-200">
          <th className="p-4 text-start text-xs font-bold text-gray-900 uppercase ">
            <Skeleton />
          </th>
          <th className="p-4 text-start text-xs font-bold text-gray-900 uppercase w-[116px]">
            <Skeleton />
          </th>
          <th className="p-4 text-start text-xs font-bold text-gray-900 uppercase w-[116px]">
            <Skeleton />
          </th>
          <th className="p-4 text-start text-xs font-bold text-gray-900 uppercase w-[116px]">
            <Skeleton />
          </th>
          <th className="p-4 text-start text-xs font-bold text-gray-900 uppercase w-[147px]">
            <Skeleton />
          </th>
          <th className="p-4 text-start text-xs font-bold text-gray-900 uppercase w-[125px]">
            <Skeleton />
          </th>
          <th className="p-4 text-start text-xs font-bold text-gray-900 uppercase ">
            <Skeleton />
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">{rowSkeleton}</tbody>
    </table>
  );
}
