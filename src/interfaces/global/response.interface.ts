export interface IGlobalResponse<T> {
  status: number
  message: string
  data: T
  pagination?: IPaginationResponse
}

export interface IPaginationResponse {
  current_page?: number
  total_pages?: number
  total_items?: number
  limit?: number
  next_page?: number
  previous_page?: number | null
}
