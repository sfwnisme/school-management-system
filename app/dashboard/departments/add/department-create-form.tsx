"use client";
import {
  IClientResponse,
  IInstructor,
  YupDepartmentCreateInputs,
} from "@/definitions";
import React, { useTransition } from "react";
import { useInstructorsOptions } from "../../../../hooks/use-instructors-options";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupDepartmentCreateSchema } from "@/lib/validation-schema-yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createDepartment } from "@/lib/actions";
import Input from "@/components/ui/input";
import Message from "@/components/ui/message";
import Button from "@/components/ui/button";
import FetchMessage from "@/components/ui/fetch-message";
import useFetchResponse from "@/hooks/use-fetch-response";

type Props = {
  instructors: IClientResponse<IInstructor[]>;
};

export default function DepartmentCreateForm(props: Props) {
  const [isCreating, startCreating] = useTransition();
  const { responseRef, updateResponse } = useFetchResponse();

  const { options, selectNotAllowed, message } = useInstructorsOptions(
    props?.instructors,
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<YupDepartmentCreateInputs>({
    resolver: yupResolver(yupDepartmentCreateSchema),
    mode: "onChange",
  });
  console.log(watch());
  const isCreatingValid = isValid && !selectNotAllowed;
  const isButtonValid = isCreating || !isCreatingValid;
  const onSubmit: SubmitHandler<YupDepartmentCreateInputs> = (data) => {
    const { insId, nameAr, nameEn } = data;
    startCreating(async () => {
      const createData = {
        insId,
        nameAr,
        nameEn,
      };
      if (isCreatingValid) {
        const res = await createDepartment(createData);
        console.log(res);
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
        <div className="col-span-full md:col-span-full">
          <label className="text-sm mb-1 block">instructor</label>
          <select
            {...register("insId")}
            disabled={selectNotAllowed}
            className={`
              disabled:opacity-50 disabled:cursor-not-allowed
              w-full h-fit border border-gray-500 rounded text-black text-sm px-4 py-2
              `}
            title={
              selectNotAllowed
                ? message + ", please contact the support"
                : "select the a instructor"
            }
          >
            <option selected disabled>
              select department
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
