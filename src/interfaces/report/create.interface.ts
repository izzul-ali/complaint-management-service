export interface ICreateReportBody {
  complaint_id: string
  schedule_id: string
  status: string
  note: string
  file?: Express.Multer.File
}

export interface ICreateReportResponse {
  report_id: string
}
