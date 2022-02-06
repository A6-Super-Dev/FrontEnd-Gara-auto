import { AxiosClient } from './axiosConnection';
import { END_POINT, TestHookReturn } from './types';

export const clientService = {
  test: async (): Promise<TestHookReturn> => {
    const { data } = await AxiosClient.get(END_POINT.sampleApi);
    return data.data;
  },
};

export const adminService = {};
