import { IClientResponse, IInstructor } from "@/definitions"
import { useMemo } from "react"

export function useInstructorsOptions(instructors: IClientResponse<IInstructor[]>) {
  const {
    data,
    isSuccess,
    isEmpty,
    isError,
    message
  } = instructors

  const selectNotAllowed = isEmpty || isError

  let options = useMemo(() => {
    if (isSuccess) {
      return data?.map((instructor) => (
        <option id={instructor.instId?.toString()} value={instructor.instId} key={instructor.instId}>
          {instructor.name}
        </option>))
    }

    if (isEmpty) {
      return (
        <option disabled value={''} className="cursor-not-allowed">
          no instructors😑
        </option>
      )
    }

    if (isError) {
      return (
        <option disabled value={''} className="cursor-not-allowed">
          request error😑
        </option>
      )
    }

  }, [data, isSuccess, isEmpty, isError])
  return {
    options,
    selectNotAllowed,
    message
  }
}