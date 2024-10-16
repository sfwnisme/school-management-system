"use client";
import Button from "@/components/ui/button";
import FetchMessage from "@/components/ui/fetch-message";
import Input from "@/components/ui/input";
import Message from "@/components/ui/message";
import {
  IClientResponse,
  IDepartment,
  IFetchResponse,
  IStudent,
  YupStudentUpdateInputs,
} from "@/definitions";
import { updateStudent } from "@/lib/actions";
import { yupStudentUpdateSchema } from "@/lib/validation-schema-yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDepartmentsOptions } from "../../../../hooks/use-departments-options";

type Props = {
  departments: IClientResponse<IDepartment[]>;
  student: IClientResponse<IStudent>;
};

export const revalid = 1;
export default function StudentUpdateForm(props: Props) {
  const [isUpdating, startUpdating] = useTransition();
  const apiResponseMessageRef = useRef<IFetchResponse<undefined>>({
    isSuccess: false,
    isError: false,
    message: "",
  });
  const {
    studId: studentId,
    name: stuedentName,
    address: studentAddress,
    departmentName,
  } = props?.student?.data || {};

  const findDepartmentId = props?.departments.data?.find(
    (department: IDepartment) =>
      department?.name === departmentName?.toString(),
  )?.deptId;

  const { options, selectNotAllowed, message } = useDepartmentsOptions(
    props?.departments,
  );

  console.log("departmentId", findDepartmentId);
  //--------------------------------
  //form submition
  //--------------------------------

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<YupStudentUpdateInputs>({
    resolver: yupResolver(yupStudentUpdateSchema),
    mode: "onChange",
    defaultValues: {
      nameAr: stuedentName,
      nameEn: stuedentName,
      address: studentAddress,
    },
  });
  const isUpdatingValid = isValid && !selectNotAllowed;
  const isButtonValid = isUpdating || !isUpdatingValid;
  const onSubmit: SubmitHandler<YupStudentUpdateInputs> = (data) => {
    const { departmentId, nameAr, nameEn, address } = data;
    startUpdating(async () => {
      const updateData = {
        departmentId,
        address,
        nameAr,
        nameEn,
      };
      if (isUpdatingValid) {
        const res = await updateStudent(updateData);
        console.log(res);
        if (res) {
          const { isSuccess, isError, message } = res;
          apiResponseMessageRef.current = { isSuccess, isError, message };
        }
      }
    });
  };
  //--------------------------------

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
        <div className="col-span-full md:col-span-3">
          <Input
            type="text"
            title="address"
            placeholder="Your user address"
            variant={
              errors.nameEn?.message
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
            defaultValue={findDepartmentId}
            disabled={selectNotAllowed}
            className={`
              cursor-pointer
              disabled:opacity-50 disabled:cursor-not-allowed
              w-full h-fit border border-gray-500 rounded text-black text-sm px-4 py-2
              `}
            title={
              selectNotAllowed
                ? message + " please contact the support"
                : "select the a department"
            }
          >
            <option selected={!findDepartmentId} disabled>
              select department
            </option>
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
          isSuccess={apiResponseMessageRef.current.isSuccess}
          isError={apiResponseMessageRef.current.isError}
          message={apiResponseMessageRef.current.message}
        />
      </form>
    </div>
  );
}
