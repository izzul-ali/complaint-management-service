import { IPaginationResponse } from "../../interfaces/global/index.interface"

/**
 *
 * @param totalItems
 * @param currentPage
 * @param limit
 * @returns
 */
export function generatePaginationResponse(
  totalItems: number,
  currentPage: number,
  limit: number
): IPaginationResponse {
  const totalPages = Math.ceil(totalItems / limit)
  const nextPage = currentPage < totalPages ? currentPage + 1 : undefined
  const previousPage = currentPage > 1 ? currentPage - 1 : null

  return {
    current_page: currentPage,
    total_pages: totalPages,
    total_items: totalItems,
    limit: limit,
    next_page: nextPage,
    previous_page: previousPage,
  }
}
