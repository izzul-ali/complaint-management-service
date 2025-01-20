import { IGlobalParams } from "../global/index.interface"

export interface IFindComplaintParams extends IGlobalParams {
  complaint_id?: string
  technician_id?: string
  start_date?: string
  end_date?: string
  category?: string
  status?: string
}

export interface IFindComplaintResponse {
  complaint_id: string
  status: string
  description: string | null
  title: string
  client_category: string
  client: {
    user_id: string
    address: string | null
    name: string
    email: string
    phone_number: string | null
  }
  updated_at: Date | null
  updated_by: string | null
  created_at: Date
  created_by: string | null
  total_client_complaint?: number
  schedule: {
    complaint_id: string
    schedule_id: string
    assigned_by: string
    created_at: Date | null
    start_date: Date | null
    end_date: Date | null
  } | null
  technicians: {
    user_id: string
    name: string
    email: string
    phone_number: string | null
  }[]
}
