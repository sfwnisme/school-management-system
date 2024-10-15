"use client";
import { IClientResponse, IDepartment, IInstructor, YupInstructorUpdateInputs } from "@/definitions";
import React, { useTransition } from "react";
import { useDepartmentsOptions } from "../../../../hooks/use-departments-options";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupInstructorUpdateSchema } from "@/lib/validation-schema-yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateInstructor } from "@/lib/actions";
import Input from "@/components/ui/input";
import Message from "@/components/ui/message";
import Button from "@/components/ui/button";
import FetchMessage from "@/components/ui/fetch-message";
import useFetchResponse from "@/hooks/use-fetch-response";

type Props = {
  instructor: IClientResponse<IInstructor>;
  departments: IClientResponse<IDepartment[]>;
};

export default function InstructorUpdateForm(props: Props) {
  const [isUpdating, startUpdating] = useTransition()
  const { responseRef, updateResponse } = useFetchResponse()

  const {
    instId: instructorId,
    name: instructorName,
    position: instructorPosition,
    salary: instructorSalary,
    deptId: instructorDeptId
  } = props?.instructor?.data || {}

  const {
    options,
    selectNotAllowed,
    message
  } = useDepartmentsOptions(props?.departments)

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

  const isUpdatingValid = isValid && !selectNotAllowed
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
          updateResponse(res)
        }
      }
    })
  };

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
            defaultValue={instructorName}
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
              selectNotAllowed
                ? message + ', please contact the support'
                : "select the a department"
            }
          >
            <option selected={!instructorDeptId} disabled>select instructor</option>
            {options}
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
          isSuccess={responseRef.current.isSuccess}
          isError={responseRef.current.isError}
          message={responseRef.current.message}
        />
      </form>
    </div>
  );
}
