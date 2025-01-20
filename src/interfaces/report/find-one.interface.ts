export interface IFindOneReportResponse {
  complaint_id: string
  report_id: string
  schedule_id: string
  notes: string
  file: IReportFile | null
  status_update: string
  technician_created: {
    user_id: string
    name: string
    email: string
    phone_number: string | null
  } | null
  created_at: Date | null
  technician_updated: {
    user_id: string
    name: string
    email: string
    phone_number: string | null
  } | null
  updated_at: Date | null
}

export interface IReportFile {
  file_id: string
  file_path: string
  file_public_url: string
  file_name: string
}
