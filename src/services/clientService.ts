import clientAPI from '../common/constants/clientAPI';
import { ClientLogin, ClientNewPassword, ClientPasswordRecover, ClientSignUp } from '../common/interfaces/Auth';
import { LoginDataReturn } from '../common/interfaces/Client';

import { AxiosClient } from './axiosConnection';

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
}

export default new ClientService();
