class ClientAPI {
  private auth = '/auth';
  private user = '/user';
  login = `${this.auth}/log-in`;
  signUp = `${this.auth}${this.user}/sign-up`;
  signUpSuccess = (token: string) => `${this.auth}${this.user}/sign-up/${token}`;
  genNewToken = `${this.auth}/gen-new-token`;
  apiCheck = `${this.auth}/api-check`;
  checkValid = `${this.auth}/check-valid`;
}

export default new ClientAPI();
