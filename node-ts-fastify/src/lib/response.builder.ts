import * as errCode from "../errors/error.code";

export interface APIResponse {
    Success: boolean,
    Message: string,
    Data?: unknown,
}

export function RespondSuccess(
  {
    message,
    data,
  }: {
    message: string;
    data: unknown;
  }
): APIResponse {
  return {
    Success: true,
    Message: message,
    Data: data,
  };
}


export function RespondError(
  {
    message,
  }: {
    message: string;
  }
): APIResponse {
  return {
    Success: false,
    Message: message,
  };
}

//error code map
function MapError(code: errCode.ErrorCode): number {
  switch (code) {
    case   errCode.ErrorCode.VALIDATION_ERROR, errCode.ErrorCode.INVALID_PAYLOAD, errCode.ErrorCode.MISSING_PARAMETER, errCode.ErrorCode.INVALID_FORMAT:
        return errCode.HttpStatus.BAD_REQUEST;

    case errCode.ErrorCode.USER_NOT_FOUND, errCode.ErrorCode.NOT_FOUND, errCode.ErrorCode.RESOURCE_NOT_FOUND:
        return errCode.HttpStatus.NOT_FOUND;

    case errCode.ErrorCode.UNAUTHENTICATED, errCode.ErrorCode.INVALID_CREDENTIALS, errCode.ErrorCode.TOKEN_EXPIRED, errCode.ErrorCode.TOKEN_INVALID:
        return errCode.HttpStatus.UNAUTHORIZED;

    case errCode.ErrorCode.USER_ALREADY_EXISTS, errCode.ErrorCode.RESOURCE_CONFLICT:
        return errCode.HttpStatus.CONFLICT;
    default:
        return errCode.HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
