import clientAPI from '../common/constants/clientAPI';
import { ClientLogin, ClientSignUp } from '../common/interfaces/Auth';
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
}

export default new ClientService();
