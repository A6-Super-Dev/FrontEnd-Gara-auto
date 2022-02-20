import { AxiosClient } from './axiosConnection';
import ServiceTypes, { TestHookReturn } from './types';

export const clientService = {
  test: async (): Promise<TestHookReturn> => {
    const { data } = await AxiosClient.get(ServiceTypes.END_POINT);
    return data.data;
  },
};

export const adminService = {};
