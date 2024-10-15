import { IFetchResponse } from "@/definitions"
import { useRef } from "react"

export default function useFetchResponse() {
  const responseRef = useRef<IFetchResponse<any>>({
    data: [],
    isSuccess: false,
    isEmpty: false,
    isError: false,
    message: ""
  })

  const updateResponse = (response: IFetchResponse<any>) => {
    responseRef.current = {
      data: response?.data,
      isSuccess: response?.isSuccess,
      isEmpty: response?.isEmpty,
      isError: response?.isError,
      message: response?.message,
    }
  }

  return {
    responseRef,
    updateResponse,
  }
}