/**
 * Shared API types — response wrappers, error formats, pagination.
 */

export type ApiError = {
  status: number
  message: string
  url?: string
}

export type PaginationParams = {
  limit: number
  offset: number
}
