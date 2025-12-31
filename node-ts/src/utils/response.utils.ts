export interface ApiResponse<T> {
    status: string;
    message: string;
    data?: T;
}

export function successResponse<T>(
  message: string,
  data?: T
): ApiResponse<T> {
  return {
    status: "ok",
    message,
    data,
  };
}


export function errorResponse(
  message: string,
  status: string
): ApiResponse<null> {
  return {
    status,
    message,
  };
}