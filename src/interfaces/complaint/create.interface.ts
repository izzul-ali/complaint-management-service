export interface ICreateComplaintBody {
  client_id: string
  title: string
  status?: string
  category: string
  start_date?: Date
  end_date?: Date
  technician_ids?: string[]
  description?: string
}

export interface ICreateComplaintResponse {
  complaint_id: string
}
