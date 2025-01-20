export interface ICreateScheduleBody {
  complaint_id: string
  technician_id: string
  assigned_by: string
  start_date: Date | null
  end_date: Date | null
}
