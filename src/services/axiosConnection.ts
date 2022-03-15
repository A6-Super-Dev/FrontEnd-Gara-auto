import axios, { AxiosRequestConfig } from 'axios';
import { getLocalStorageItem, getRefreshToken } from '../common/helper/storage';
import ServiceTypes from './types';
import ClientMessages from '../common/constants/messages';

enum TokenPrefix {
  BEARER = 'Bearer',
}

export const AxiosClient = axios.create({
  baseURL: ServiceTypes.BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const AxiosClientAPI = axios.create({
  baseURL: ServiceTypes.BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const AxiosClientRequestAccessTokenAPI = axios.create({
  baseURL: ServiceTypes.BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

AxiosClientAPI.interceptors.request.use(
  (request: AxiosRequestConfig<any>) => {
    request.timeoutErrorMessage = ClientMessages.ClientTimeOut;
    request.headers = {
      Authorization: getLocalStorageItem('token') as string,
    };
    return request;
  },
  (exception) => {
    return exception;
  }
);

AxiosClientRequestAccessTokenAPI.interceptors.request.use(
  (request: AxiosRequestConfig<any>) => {
    request.timeoutErrorMessage = ClientMessages.ClientTimeOut;
    request.headers = {
      Authorization: TokenPrefix.BEARER + getRefreshToken(),
    };
    return request;
  },
  (exception) => {
    return exception;
  }
);
