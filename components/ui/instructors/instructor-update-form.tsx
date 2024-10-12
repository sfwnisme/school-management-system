"use client";
import React, { ChangeEvent, Fragment, useState, useTransition, useRef } from "react";
import Input from "../input";
import {
  IClientResponse,
  IDepartment,
  IFetchResponse2,
  IInstructor,
  IResponse,
  IUser,
  YupInstructorUpdateInputs,
  YupUserUpdateInputs,
} from "@/definitions";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getAllUsers, resetUserPassword, updateInstructor } from "@/lib/actions";
import Button from "../button";
import { yupInstructorUpdateSchema } from "@/lib/validation-schema-yup";
import Message from "../message";
import FetchMessage from "../fetch-message";

type Props = {
  instructor: IClientResponse<IInstructor>;
  departments: IClientResponse<IDepartment[]>;
};

type Inputs = {
  userName: string;
  fullName: string;
  email?: string;
};
export const revalid = 1;
export default function InstructorUpdateForm(props: Props) {
  const [isUpdating, startUpdating] = useTransition()
  const apiResponseMessageRef = useRef<IFetchResponse2<undefined>>({
    isSuccess: false,
    isError: false,
    message: "",
  })

  console.log(props)

  const {
    instId: instructorId,
    name: instructorName,
    position: instructorPosition,
    salary: instructorSalary,
    deptId: instructorDeptId
  } = props?.instructor?.data as IInstructor

  console.log(props?.departments)
  const {
    data: departmentsData,
    isSuccess: isSuccessDepartments,
    isEmpty: isEmptyDepartments,
    isError: isErrorDepartments,
    message: messageDepartment
  } = props?.departments

  const selectNotAllowed = isEmptyDepartments || isErrorDepartments
  console.log(selectNotAllowed)
  //--------------------------------
  // departments
  //--------------------------------
  let departmentsOptions
  const departmentsOptionsIsSuccess = departmentsData?.map((dep) => (
    <option id={dep?.deptId?.toString()} value={dep.deptId} key={dep.deptId}>
      {dep.name}
    </option>
  ))

  const departmentsOptionsIsEmpty = <option disabled value={instructorDeptId} className="cursor-not-allowed">
    no departments😑
  </option>

  const departmentsOptionsIsError = <option disabled value={instructorDeptId} className="cursor-not-allowed">
    request error😑
  </option>
  console.log(isEmptyDepartments)
  if (isSuccessDepartments) {
    departmentsOptions = departmentsOptionsIsSuccess
  }
  if (isEmptyDepartments) {
    departmentsOptions = departmentsOptionsIsEmpty
  }
  if (isErrorDepartments) {
    departmentsOptions = departmentsOptionsIsError
  }
  //--------------------------------

  //--------------------------------
  // form submition
  //--------------------------------
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<YupInstructorUpdateInputs>({
    resolver: yupResolver(yupInstructorUpdateSchema),
    mode: "onChange",
    defaultValues: {
      nameAr: instructorName,
      nameEn: instructorName,
      position: instructorPosition,
      salary: instructorSalary,
      departmentId: instructorDeptId,
    },
  });

  const isUpdatingValid = isValid && !isEmptyDepartments && !isErrorDepartments
  const isButtonValid = isUpdating || !isUpdatingValid
  const onSubmit: SubmitHandler<YupInstructorUpdateInputs> = (data) => {
    const { nameAr, nameEn, position, salary, departmentId } = data
    startUpdating(async () => {
      const updateData = {
        id: instructorId,
        nameAr, nameEn, position, salary, departmentId
      };
      if (isUpdatingValid) {
        const res = await updateInstructor(updateData);
        console.log(res);
        if (res) {
          const { isSuccess, isError, message } = res
          apiResponseMessageRef.current = { isSuccess, isError, message }
        }
      }
    })
  };

  //--------------------------------
  return (
    <div className="w-full md:max-w-[700px] md:w-auto mx-auto rounded border border-gray-300 p-4">
      <h1 className="mb-4 text-lg font-medium underline">
        Update users info:
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-4 gap-2"
      >
        <div className="col-span-full md:col-span-2">
          <Input
            type="text"
            title="arabic name"
            placeholder="Your full arabic name"
            variant={
              errors.nameAr?.message
                ? "danger"
                : isValid
                  ? "success"
                  : "initial"
            }
            {...register("nameAr")}
          />
          <Message variant="danger">{errors.nameAr?.message}</Message>
        </div>
        <div className="col-span-full md:col-span-2">
          <Input
            type="text"
            title="english name"
            placeholder="Your user english name"
            variant={
              errors.nameEn?.message
                ? "danger"
                : isValid
                  ? "success"
                  : "initial"
            }
            {...register("nameEn")}
          />
          <Message variant="danger">{errors.nameEn?.message}</Message>
        </div>
        <div className="col-span-full md:col-span-2">
          <Input
            type="text"
            title="position"
            placeholder="Your position"
            variant={
              errors.position?.message ? "danger" : isValid ? "success" : "initial"
            }
            {...register("position")}
          />
          <Message variant="danger">{errors.position?.message}</Message>
        </div>
        <div className="col-span-full md:col-span-1">
          <Input
            type="text"
            title="salary"
            placeholder="Your user salary"
            variant={
              errors.salary?.message
                ? "danger"
                : isValid
                  ? "success"
                  : "initial"
            }
            {...register("salary")}
          />
          <Message variant="danger">{errors.salary?.message}</Message>
        </div>
        <div className="col-span-full md:col-span-1">
          <label className="text-sm mb-1 block">
            department
          </label>
          <select
            {...register("departmentId")}
            defaultValue={instructorDeptId}
            disabled={selectNotAllowed}
            className={`
              disabled:opacity-50 disabled:cursor-not-allowed
              w-full h-fit border border-gray-500 rounded text-black text-sm px-4 py-2
              `}
            title={
              isErrorDepartments
                ? messageDepartment.join(' ') + ' please contact the support'
                : isEmptyDepartments
                  ? "no departments yet"
                  : "select the a department"
            }
          >
            {departmentsOptions}
          </select>
        </div>
        <Button
          variant="info"
          type="submit"
          loading={isUpdating}
          disabled={isButtonValid}
          loadingText="Updating..."
        >
          Update
        </Button>
        <FetchMessage
          isSuccess={apiResponseMessageRef.current.isSuccess}
          isError={apiResponseMessageRef.current.isError}
          message={apiResponseMessageRef.current.message}
        />
      </form>
    </div>
  );
}
