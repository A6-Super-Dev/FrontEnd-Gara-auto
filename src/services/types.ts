export const BASE_URL = 'http://localhost:4000';

export const END_POINT = {
  sampleApi: '/api/product/',
};

export interface ErrorTypes {
  statusCode: number;
  name: string;
  message: string | object;
}
