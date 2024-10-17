"use client";
import React, { useTransition } from "react";
import {
  IClientResponse,
  ISubject,
  YupSubjectUpdateInputs,
} from "@/definitions";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateSubject } from "@/lib/actions";
import { yupSubjectUpdateSchema } from "@/lib/validation-schema-yup";
import Input from "@/components/ui/input";
import Message from "@/components/ui/message";
import Button from "@/components/ui/button";
import FetchMessage from "@/components/ui/fetch-message";
import useFetchResponse from "@/hooks/use-fetch-response";

type Props = {
  subject: IClientResponse<ISubject>;
};

export default function SubjectUpdateForm(props: Props) {
  const [isUpdating, startUpdating] = useTransition();
  const { responseRef, updateResponse } = useFetchResponse();

  const { id, name, period } = props?.subject?.data || {};

  console.log(props?.subject.data);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<YupSubjectUpdateInputs>({
    resolver: yupResolver(yupSubjectUpdateSchema),
    mode: "onChange",
    defaultValues: {
      subjectNameAr: name,
      subjectNameEn: name,
      period: period?.split("T")[0],
    },
  });

  console.log(watch());

  const isUpdatingValid = isValid;
  const isButtonValid = isUpdating || !isUpdatingValid;
  const onSubmit: SubmitHandler<YupSubjectUpdateInputs> = (data) => {
    const { subjectNameAr, subjectNameEn, period } = data;
    startUpdating(async () => {
      const updateData = {
        subjectId: id,
        subjectNameAr,
        subjectNameEn,
        period,
      };
      if (isUpdatingValid) {
        const res = await updateSubject(updateData);
        if (res) {
          updateResponse(res);
        }
      }
    });
  };

  return (
    <div className="w-full md:max-w-[700px] md:w-auto mx-auto rounded border border-gray-300 p-4">
      <h1 className="mb-4 text-lg font-medium underline">
        Update subject&apos;s info:
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
        <div className="col-span-full">
          <Input
            type="date"
            title="english name"
            placeholder="Your user english name"
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
