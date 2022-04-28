import { AxiosResponse } from 'axios';

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

interface ClientRequestAccessTokenReturn {
  statusCode: number;
  headers: {
    authorization: string;
  };
}

export enum AuthenticationStatus {
  Idle = 'Idle',
  UnAuthorized = 'Unauthorized',
  Authorized = 'Authorized',
}

export type LoginErrorResponse = AxiosResponse<ErrorResponseData>;
export type UserSignUpErrorResponse = AxiosResponse<ErrorResponseData>;
export type UserPasswordRecoverResponse = AxiosResponse<ErrorResponseData>;
export type UserNewPasswordResponse = AxiosResponse<ErrorResponseData>;
export type InterceptorErrorResponse = AxiosResponse<ErrorResponseData>;
export type ClientRequestAccessToken = AxiosResponse<ClientRequestAccessTokenReturn>;
