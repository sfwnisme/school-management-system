"use client";
import React, { useTransition } from "react";
import {
  IClientResponse,
  IDepartment,
  IInstructor,
  YupDepartmentUpdateInputs,
} from "@/definitions";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateDepartment } from "@/lib/actions";
import { yupDepartmentUpdateSchema } from "@/lib/validation-schema-yup";
import Input from "@/components/ui/input";
import Message from "@/components/ui/message";
import Button from "@/components/ui/button";
import FetchMessage from "@/components/ui/fetch-message";
import { useInstructorsOptions } from "../../../../hooks/use-instructors-options";
import useFetchResponse from "@/hooks/use-fetch-response";

type Props = {
  department: IClientResponse<IDepartment>;
  instructors: IClientResponse<IInstructor[]>;
};

export default function DepartmentUpdateForm(props: Props) {
  const [isUpdating, startUpdating] = useTransition();
  const { responseRef, updateResponse } = useFetchResponse();

  const {
    id: departmentId,
    managerName: departmentManagerName,
    name: departmentName,
  } = props?.department?.data || {};

  const { options, selectNotAllowed, message } = useInstructorsOptions(
    props?.instructors,
  );
  const findInsctructorId = props?.instructors.data?.find(
    (instructor) => instructor?.name === departmentManagerName,
  )?.instId;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<YupDepartmentUpdateInputs>({
    resolver: yupResolver(yupDepartmentUpdateSchema),
    mode: "onChange",
    defaultValues: {
      insId: findInsctructorId,
      nameAr: departmentName,
      nameEn: departmentName,
    },
  });

  const isUpdatingValid = isValid && !selectNotAllowed;
  const isButtonValid = isUpdating || !isUpdatingValid;
  const onSubmit: SubmitHandler<YupDepartmentUpdateInputs> = (data) => {
    const { insId, nameAr, nameEn } = data;
    startUpdating(async () => {
      const updateData = {
        departmentId,
        insId: insId,
        nameAr,
        nameEn,
      };
      if (isUpdatingValid) {
        const res = await updateDepartment(updateData);
        if (res) {
          updateResponse(res);
        }
      }
    });
  };

  return (
    <div className="w-full md:max-w-[700px] md:w-auto mx-auto rounded border border-gray-300 p-4">
      <h1 className="mb-4 text-lg font-medium underline">Update users info:</h1>
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
        <div className="col-span-full">
          <label className="text-sm mb-1 block">instructor</label>
          <select
            {...register("insId")}
            defaultValue={findInsctructorId}
            disabled={selectNotAllowed}
            className={`
              disabled:opacity-50 disabled:cursor-not-allowed
              w-full h-fit border border-gray-500 rounded text-black text-sm px-4 py-2
              `}
            title={
              selectNotAllowed
                ? message + " please contact the support"
                : "select the a department"
            }
          >
            <option selected={!findInsctructorId} disabled>
              select instructor
            </option>
            {options}
          </select>
        </div>
        <div className="col-span-full">
          <Button
            variant="info"
            type="submit"
            width="full"
            loading={isUpdating}
            disabled={isButtonValid}
            loadingText="Updating..."
          >
            Update
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
