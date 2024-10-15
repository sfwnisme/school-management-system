import { IFetchResponse } from "@/definitions"
import { useRef } from "react"

// type Types =  
export default function useApiResponse() {
  const apiResponse = useRef<IFetchResponse<any>>({
    data: [],
    isSuccess: false,
    isEmpty: false,
    isError: false,
    message: ""
  })

  const updateResponse = (response: IFetchResponse<any>) => {
    apiResponse.current = {
      data: response?.data,
      isSuccess: response?.isSuccess,
      isEmpty: response?.isEmpty,
      isError: response?.isError,
      message: response?.message,
    }
  }
  return {
    apiResponse,
    updateResponse,
  }
}