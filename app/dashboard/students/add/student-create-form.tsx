"use client";
import {
  IClientResponse,
  IDepartment,
  YupStudentCreateInputs,
} from "@/definitions";
import React, { useTransition } from "react";
import { useDepartmentsOptions } from "../../../../hooks/use-departments-options";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupStudentCreateSchema } from "@/lib/validation-schema-yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createStudent } from "@/lib/actions";
import Input from "@/components/ui/input";
import Message from "@/components/ui/message";
import Button from "@/components/ui/button";
import FetchMessage from "@/components/ui/fetch-message";
import useFetchResponse from "@/hooks/use-fetch-response";

type Props = {
  departments: IClientResponse<IDepartment[]>;
};

export default function StudentCreateForm(props: Props) {
  const [isCreating, startCreating] = useTransition();
  const { responseRef, updateResponse } = useFetchResponse();

  const { options, selectNotAllowed, message } = useDepartmentsOptions(
    props?.departments,
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<YupStudentCreateInputs>({
    resolver: yupResolver(yupStudentCreateSchema),
    mode: "onChange",
  });
  console.log(watch());
  const isCreatingValid = isValid && !selectNotAllowed;
  const isButtonValid = isCreating || !isCreatingValid;
  const onSubmit: SubmitHandler<YupStudentCreateInputs> = (data) => {
    const { nameAr, nameEn, address, departmentId } = data;
    startCreating(async () => {
      const createData = {
        nameAr,
        nameEn,
        address,
        departmentId,
      };
      if (isCreatingValid) {
        const res = await createStudent(createData);
        console.log(res);
        if (res) {
          updateResponse(res);
        }
      }
    });
  };

  return (
    <div className="w-full md:max-w-[700px] md:w-auto mx-auto rounded border border-gray-300 p-4">
      <h1 className="mb-4 text-lg font-medium underline">Create users info:</h1>
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
        <div className="col-span-full md:col-span-3">
          <Input
            type="text"
            title="address"
            placeholder="Your user address"
            variant={
              errors.address?.message
                ? "danger"
                : isValid
                  ? "success"
                  : "initial"
            }
            {...register("address")}
          />
          <Message variant="danger">{errors.address?.message}</Message>
        </div>
        <div className="col-span-full md:col-span-1">
          <label className="text-sm mb-1 block">department</label>
          <select
            {...register("departmentId")}
            disabled={selectNotAllowed}
            className={`
              disabled:opacity-50 disabled:cursor-not-allowed
              w-full h-fit border border-gray-500 rounded text-black text-sm px-4 py-2
              `}
            title={
              selectNotAllowed
                ? message + ", please contact the support"
                : "select the a department"
            }
          >
            <option selected disabled>
              select student
            </option>
            {options}
          </select>
        </div>
        <div className="col-span-full">
          <Button
            variant="info"
            type="submit"
            width="full"
            loading={isCreating}
            disabled={isButtonValid}
            loadingText="Creating..."
          >
            Create
          </Button>
        </div>
        <FetchMessage
          isSuccess={responseRef.current.isSuccess}
          isError={responseRef.current.isError}
          message={responseRef.current.message}
        />
      </form>
    </div>
  );
}
