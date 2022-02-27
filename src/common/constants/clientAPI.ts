class ClientAPI {
  private auth = '/auth';
  private user = '/user';
  login = `${this.auth}/log-in`;
  signUp = `${this.user}/sign-up`;
}

export default new ClientAPI();
