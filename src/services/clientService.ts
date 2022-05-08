import axios from 'axios';

import clientAPI from '../common/constants/clientAPI';
import thirdPartyAPI from '../common/constants/thirdPartyAPI';
import { ClientLogin, ClientNewPassword, ClientPasswordRecover, ClientSignUp } from '../common/interfaces/Auth';
import { LoginDataReturn } from '../common/interfaces/Client';
import {
  ClientInfo,
  DistrictAttributes,
  DistrictInfo,
  ProvinceAttributes,
  ProvinceInfo,
  UpdateClientInfoAttributes,
  User,
  WardAttributes,
  WardInfo,
} from '../reduxToolKit-Saga/types/auth';

import { AxiosClient, AxiosClientAPI } from './axiosConnection';

class ClientService {
  async login(params: ClientLogin): Promise<LoginDataReturn> {
    const { data } = await AxiosClient.post(clientAPI.login, params);
    return data;
  }

  async userSignUp(params: ClientSignUp) {
    const { data } = await AxiosClient.post(clientAPI.signUp, params);
    return data;
  }

  async userSignUpSuccess(token: string) {
    const { data } = await AxiosClient.post(clientAPI.signUpSuccess(token));
    return data;
  }

  async userPasswordRecover(params: ClientPasswordRecover) {
    const { data } = await AxiosClient.post(clientAPI.passwordRecover, params);
    return data;
  }

  async userNewPassword(token: string, params: ClientNewPassword) {
    const { data } = await AxiosClient.post(clientAPI.newPassword(token), params);
    return data;
  }

  async getAllBrand() {
    const { data } = await AxiosClient.get(clientAPI.getAllBrand);
    return data;
  }

  async getCar(name: string) {
    const { data } = await AxiosClient.get(clientAPI.getCar(name));
    return data;
  }

  async getCarByBrandName(brand: string) {
    const { data } = await AxiosClient.get(clientAPI.getCarByBrandName(brand));
    return data;
  }

  async getBrand(brand: string) {
    const { data } = await AxiosClient.get(clientAPI.getBrand(brand));
    return data;
  }

  async getClientData(): Promise<User> {
    const response: ClientInfo = await AxiosClientAPI.get(clientAPI.getClientData);
    return response.data;
  }

  async getListProvince(): Promise<ProvinceAttributes[]> {
    const response: ProvinceInfo = await axios.get(thirdPartyAPI.getProvince);
    return response.data.results;
  }

  async getListDistrict(provinceId: string): Promise<DistrictAttributes[]> {
    const response: DistrictInfo = await axios.get(thirdPartyAPI.getDistrict(provinceId));
    return response.data.results;
  }

  async getListWard(districtId: string): Promise<WardAttributes[]> {
    const response: WardInfo = await axios.get(thirdPartyAPI.getWard(districtId));
    return response.data.results;
  }

  async updateCLientInfo(data: UpdateClientInfoAttributes): Promise<void> {
    await AxiosClientAPI.patch(clientAPI.updateProfile, data);
  }
  async getBlogs(page: number, limit = 10) {
    return await AxiosClient.get(clientAPI.getBlogs(page, limit));
  }
}

export default new ClientService();
