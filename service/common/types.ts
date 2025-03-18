export interface ApiResponse<T> {
  success?: boolean;
  message?: string;
  data?: T;
}
export interface ApiResponseStatus {
  success?: boolean;
  message?: string;
}
