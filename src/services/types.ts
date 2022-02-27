export interface ErrorTypes {
  statusCode: number;
  name: string;
  message: string | object;
}

export interface TestHookReturn {
  _id: string;
  headline: string;
}

export type EnvironmentType = 'production' | 'develop' | 'test';

class ServiceTypes {
  public environment: EnvironmentType;
  public BASE_URL: string;
  public END_POINT: string = 'blogs/';

  constructor() {
    this.environment = 'develop';
    this.BASE_URL =
      this.environment === 'develop'
        ? 'http://localhost:6000/'
        : 'https://back-end-compu-mobile.herokuapp.com/';
  }

  public setEnvironment(env: EnvironmentType) {
    this.environment = env;
  }
}

export default new ServiceTypes();
