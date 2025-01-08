import { IGlobalResponse } from "../../interfaces/global/index.interface"
import createHttpError from "http-errors"

export const handleError = (error: {
  status?: number
  message?: string
  data?: any
}) => {
  const response: IGlobalResponse<any> = {
    status: error?.status || 500,
    message: error?.message || "Internal Server Error",
    data: error?.data || {},
  }

  throw createHttpError(error?.status || 500, response)
}
