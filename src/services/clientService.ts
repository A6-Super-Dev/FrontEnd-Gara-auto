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
}

export default new ClientService();
