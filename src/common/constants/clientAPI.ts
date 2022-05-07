class ClientAPI {
  private auth = '/auth';
  private user = '/user';
  private client = 'client';
  login = `${this.auth}/log-in`;
  signUp = `${this.auth}${this.user}/sign-up`;
  signUpSuccess = (token: string) => `${this.auth}${this.user}/sign-up/${token}`;
  passwordRecover = `${this.auth}${this.user}/password-recover`;
  newPassword = (token: string) => `${this.auth}${this.user}/new-password/${token}`;
  genNewToken = `${this.auth}/gen-new-token`;
  apiCheck = `${this.auth}/api-check`;
  checkValid = `${this.auth}/check-valid`;
  getAllBrand = `${this.client}/brand/get-all`;
  getCar = (name: string) => `${this.client}/car/get-one/${name}`;
  getCarByBrandName = (brand: string) => `${this.client}/car/brand/${brand}`;
  getBrand = (brand: string) => `${this.client}/brand/${brand}`;
  getClientData = `/client/client-data`;
  updateProfile = `/client/update-client-info`;
}

export default new ClientAPI();
