import clientAPI from '../common/constants/clientAPI';
import { ClientLogin } from '../common/interfaces/Auth';
import { LoginDataReturn } from '../common/interfaces/Client';
import { AxiosClient } from './axiosConnection';

class ClientService {
  async login(params: ClientLogin): Promise<LoginDataReturn> {
    const { data } = await AxiosClient.post(clientAPI.login, params);
    return data;
  }
}

export default new ClientService();
