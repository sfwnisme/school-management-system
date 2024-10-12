"use client";
import React, { useTransition, useRef } from "react";
import {
  IClientResponse,
  IDepartment,
  IFetchResponse2,
  IInstructor,
  YupDepartmentUpdateInputs,
  YupInstructorUpdateInputs,
} from "@/definitions";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateDepartment, updateInstructor } from "@/lib/actions";
import { yupDepartmentUpdateSchema, yupInstructorUpdateSchema } from "@/lib/validation-schema-yup";
import Input from "@/components/ui/input";
import Message from "@/components/ui/message";
import Button from "@/components/ui/button";
import FetchMessage from "@/components/ui/fetch-message";

type Props = {
  department: IClientResponse<IDepartment>;
  instructors: IClientResponse<IInstructor[]>;
};

export const revalid = 1;
export default function DepartmentUpdateForm(props: Props) {
  const [isUpdating, startUpdating] = useTransition()
  const apiResponseMessageRef = useRef<IFetchResponse2<undefined>>({
    isSuccess: false,
    isError: false,
    message: "",
  })

  const {
    id: departmentId,
    managerName: departmentManagerName,
    name: departmentName
  } = props?.department?.data as IDepartment

  console.log(props?.department)
  const {
    data: instructorsData,
    isSuccess: isSuccessInstructors,
    isEmpty: isEmptyInstructors,
    isError: isErrorInstructors,
    message: messageInstructors
  } = props?.instructors

  const selectNotAllowed = isEmptyInstructors || isErrorInstructors
  //--------------------------------
  // departments
  //--------------------------------
  const findInsctructorId = instructorsData?.find(instructor => instructor?.name === departmentManagerName)?.instId
  let instructorsOptions
  const instructorsOptionsIsSuccess = instructorsData?.map((dep) => (
    <option id={dep.instId?.toString()} value={dep.instId} key={dep.instId}>
      {dep.name}
    </option>
  ))

  const instructorsOptionsIsEmpty = <option disabled value={findInsctructorId} className="cursor-not-allowed">
    no departments😑
  </option>

  const instructorsOptionsIsError = <option disabled value={findInsctructorId} className="cursor-not-allowed">
    request error😑
  </option>
  console.log(isEmptyInstructors)
  if (isSuccessInstructors) {
    instructorsOptions = instructorsOptionsIsSuccess
  }
  if (isEmptyInstructors) {
    instructorsOptions = instructorsOptionsIsEmpty
  }
  if (isErrorInstructors) {
    instructorsOptions = instructorsOptionsIsError
  }
  //--------------------------------

  //--------------------------------
  // form submition
  //--------------------------------
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<YupDepartmentUpdateInputs>({
    resolver: yupResolver(yupDepartmentUpdateSchema),
    mode: "onChange",
    defaultValues: {
      // departmentId: Number(departmentId),
      insId: findInsctructorId,
      nameAr: departmentName,
      nameEn: departmentName
    },
  });

  console.log(props.department.data)
  console.log(departmentId)

  const isUpdatingValid = isValid && !isEmptyInstructors && !isErrorInstructors
  const isButtonValid = isUpdating || !isUpdatingValid
  const onSubmit: SubmitHandler<YupDepartmentUpdateInputs> = (data) => {
    const { insId, nameAr, nameEn } = data
    startUpdating(async () => {
      const updateData = {
        departmentId,
        insId: insId,
        nameAr,
        nameEn
      };
      if (isUpdatingValid) {
        const res = await updateDepartment(updateData);
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
        <div className="col-span-full md:col-span-1">
          <label className="text-sm mb-1 block">
            instructor
          </label>
          <select
            {...register("insId")}
            defaultValue={findInsctructorId}
            disabled={selectNotAllowed}
            className={`
              disabled:opacity-50 disabled:cursor-not-allowed
              w-full h-fit border border-gray-500 rounded text-black text-sm px-4 py-2
              `}
            title={
              isErrorInstructors
                ? messageInstructors.join(' ') + ' please contact the support'
                : isEmptyInstructors
                  ? "no departments yet"
                  : "select the a department"
            }
          >
            {instructorsOptions}
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
