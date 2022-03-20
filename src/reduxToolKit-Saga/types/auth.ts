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

export interface ErrorResponse {
  status: number;
  statusText: string;
  data: ErrorResponseData;
}

export enum AuthActionType {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}
