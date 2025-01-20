export interface IUpdateComplaintBody {
  complaint_id: string
  title: string
  client_id: string
  status: string
  category: string
  start_date: Date
  end_date: Date
  description?: string
  technician_ids?: string[]
}
