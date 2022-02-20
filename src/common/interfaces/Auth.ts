import * as Yup from 'yup';

export interface AdminLogin {
  email: string;
  passcode: string;
}

export interface AdminAccountCreate {
  email: string;
  roles: string;
}

export interface AdminPasscodeRecover {
  email: string;
  roles: string;
}

export interface ClientSignUp {
  email: string;
  password: string;
  reTypePassword: string;
  gCaptcha: string;
  roles: string;
}

export interface ClientLogin {
  email: string;
  password: string;
}

export interface ClientPasswordRecover {
  email: string;
  password: string;
  reTypePassword: string;
}

export enum UserRoles {
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN',
  EXPERT = 'EXPERT',
  SALE = 'SALE',
}

class AuthInterfaces {
  public clientLoginSchema;
  public clientSignUpSchema;
  public clientPasswordRecoverSchema;
  public adminLoginSchema;
  public adminAccountCreateSchema;
  public adminPasscodeRecoverSchema;

  constructor() {
    this.clientLoginSchema = Yup.object().shape({
      email: Yup.string()
        .email()
        .min(10, 'Your email is too short')
        .max(30, 'Your email is too long')
        .required('This field can not be empty'),
      password: Yup.string()
        .min(6, 'Incorrect password length')
        .max(20, 'Incorrect password length')
        .required('This field can not be empty'),
    });

    this.clientSignUpSchema = Yup.object().shape({
      email: Yup.string()
        .email()
        .min(10, 'Your email is too short')
        .max(30, 'Your email is too long')
        .required('This field can not be empty'),
      password: Yup.string()
        .min(6, 'Incorrect password length')
        .max(20, 'Incorrect password length')
        .required('This field can not be empty'),
      reTypePassword: Yup.string()
        .min(6, 'Incorrect password length')
        .max(20, 'Incorrect password length')
        .required('This field can not be empty')
        .oneOf([Yup.ref('password')], "Password retype doesn't match "),
      gCaptcha: Yup.string().required(),
      roles: Yup.string().notOneOf([Yup.ref(UserRoles.CLIENT)]),
    });

    this.clientPasswordRecoverSchema = Yup.object().shape({
      email: Yup.string()
        .email()
        .min(10, 'Your email is too short')
        .max(30, 'Your email is too long')
        .required('This field can not be empty'),
      password: Yup.string()
        .min(6, 'Incorrect password length')
        .max(20, 'Incorrect password length')
        .required('This field can not be empty'),
      reTypePassword: Yup.string()
        .min(6, 'Incorrect password length')
        .max(20, 'Incorrect password length')
        .required('This field can not be empty')
        .oneOf([Yup.ref('password')], "Password retype doesn't match "),
    });

    this.adminAccountCreateSchema = Yup.object().shape({
      email: Yup.string()
        .email()
        .min(10, 'Your email is too short')
        .max(30, 'Your email is too long')
        .required('This field can not be empty'),
      roles: Yup.string().notOneOf(
        [
          Yup.ref(UserRoles.CLIENT),
          Yup.ref(UserRoles.ADMIN),
          Yup.ref(UserRoles.SALE),
          Yup.ref(UserRoles.EXPERT),
        ],
        `Account roles must be one of ${UserRoles.CLIENT}, ${UserRoles.ADMIN},${UserRoles.EXPERT},${UserRoles.SALE}, `
      ),
    });

    this.adminLoginSchema = Yup.object().shape({
      email: Yup.string()
        .email()
        .min(10, 'Your email is too short')
        .max(30, 'Your email is too long')
        .required('This field can not be empty'),
      passcode: Yup.string()
        .required('This field can not be empty')
        .matches(/^[0-9]+$/, 'Must be only digits')
        .test('len', 'Must be exactly 6 numbers', (val) => val?.length === 6),
    });

    this.adminPasscodeRecoverSchema = Yup.object().shape({
      email: Yup.string()
        .email()
        .min(10, 'Your email is too short')
        .max(30, 'Your email is too long')
        .required('This field can not be empty'),
      roles: Yup.string().notOneOf(
        [
          Yup.ref(UserRoles.CLIENT),
          Yup.ref(UserRoles.ADMIN),
          Yup.ref(UserRoles.SALE),
          Yup.ref(UserRoles.EXPERT),
        ],
        `Account roles must be one of ${UserRoles.CLIENT}, ${UserRoles.ADMIN},${UserRoles.EXPERT},${UserRoles.SALE}, `
      ),
    });
  }
}

export default new AuthInterfaces();
