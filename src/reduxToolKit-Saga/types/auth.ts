export interface LoginParams {
  email: string;
  password: string;
}

interface ErrorResponseData {
  code: number;
  data: any;
  message: string;
  success: boolean;
}

export interface ErrorResponse<T> {
  status: number;
  statusText: string;
  data: T;
}

export enum AuthActionType {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

export type LoginErrorResponse = ErrorResponse<ErrorResponseData>;
export type RequestForRefreshTokenErrorResponse = ErrorResponse<ErrorResponseData>;
export type TestErrorResponse = ErrorResponse<ErrorResponseData>;
