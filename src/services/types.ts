export const BASE_URL = 'https://back-end-compu-mobile.herokuapp.com/';

export const END_POINT = {
  sampleApi: 'blogs/',
};

export interface ErrorTypes {
  statusCode: number;
  name: string;
  message: string | object;
}

export interface TestHookReturn {
  _id: string;
  headline: string;
}
