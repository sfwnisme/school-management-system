"use client";
import {
  IClientResponse,
  IDepartment,
  YupSubjectCreateInputs,
} from "@/definitions";
import React, { useTransition } from "react";
import { useDepartmentsOptions } from "../../../../hooks/use-departments-options";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupSubjectCreateSchema } from "@/lib/validation-schema-yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createSubject } from "@/lib/actions";
import Input from "@/components/ui/input";
import Message from "@/components/ui/message";
import Button from "@/components/ui/button";
import FetchMessage from "@/components/ui/fetch-message";
import useFetchResponse from "@/hooks/use-fetch-response";

export default function SubjectCreateForm() {
  const [isCreating, startCreating] = useTransition();
  const { responseRef, updateResponse } = useFetchResponse();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<YupSubjectCreateInputs>({
    resolver: yupResolver(yupSubjectCreateSchema),
    mode: "onChange",
  });
  console.log(watch());
  const isCreatingValid = isValid;
  const isButtonValid = isCreating || !isCreatingValid;
  const onSubmit: SubmitHandler<YupSubjectCreateInputs> = (data) => {
    const { subjectNameAr, subjectNameEn, period } = data;
    startCreating(async () => {
      const createData = {
        subjectNameAr,
        subjectNameEn,
        period,
      };
      if (isCreatingValid) {
        const res = await createSubject(createData);
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
              errors.subjectNameAr?.message
                ? "danger"
                : isValid
                  ? "success"
                  : "initial"
            }
            {...register("subjectNameAr")}
          />
          <Message variant="danger">{errors.subjectNameAr?.message}</Message>
        </div>
        <div className="col-span-full md:col-span-2">
          <Input
            type="text"
            title="english name"
            placeholder="Your user english name"
            variant={
              errors.subjectNameEn?.message
                ? "danger"
                : isValid
                  ? "success"
                  : "initial"
            }
            {...register("subjectNameEn")}
          />
          <Message variant="danger">{errors.subjectNameEn?.message}</Message>
        </div>
        <div className="col-span-full md:col-span-4">
          <Input
            type="date"
            title="period"
            placeholder="Your user period"
            variant={
              errors.period?.message
                ? "danger"
                : isValid
                  ? "success"
                  : "initial"
            }
            {...register("period")}
          />
          <Message variant="danger">{errors.period?.message}</Message>
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
