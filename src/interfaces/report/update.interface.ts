import { ICreateReportBody } from "./create.interface"

export interface IUpdateReportBody extends ICreateReportBody {
  report_id: string
  file_path?: string
}

export interface IUpdateReportResponse {
  report_id: string
}
