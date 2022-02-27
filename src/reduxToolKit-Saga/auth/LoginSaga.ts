import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { routerPath } from '../../common/constants/routerPath';
import {
  destroyCookie,
  destroyLocalStorageItem,
  setCookie,
  setLocalStorageItem,
} from '../../common/helper/storage';
import { LoginDataReturn } from '../../common/interfaces/Client';
import ClientService from '../../services/clientService';
import { login, loginReject, loginSuccess, logOut, reset } from './LoginSlice';
import TimeHelper from '../../common/helper/time';

interface LoginParams {
  email: string;
  password: string;
}

interface ErrorResponseData {
  code: number;
  data: any;
  message: string;
  success: boolean;
}

interface ErrorResponse {
  status: number;
  statusText: string;
  data: ErrorResponseData;
}

function* loginSaga(action: PayloadAction<LoginParams>) {
  try {
    const res: LoginDataReturn = yield call(() =>
      ClientService.login(action.payload)
    );
    if (res.statusCode === 200) {
      yield put(
        loginSuccess({
          accessToken: res.headers.authorization,
          loginMessage: 'Login success, you will be redirected to Home',
          loginStatus: true,
          refreshToken: res.body.authorization,
        })
      );

      const expiredTime = TimeHelper.addTime(new Date(), 'days', 7);
      setCookie('token', String(res.body.authorization), {
        expires: expiredTime,
      });
      setLocalStorageItem('token', String(res.headers.authorization));
      setTimeout(() => {
        window.location.pathname = routerPath.client.common.HOME;
      }, 600);
      yield put(reset());
    }
  } catch (error: any) {
    const resErr: ErrorResponse = error.response;
    yield put(
      loginReject({
        loginMessage: resErr.data.message,
        loginStatus: false,
      })
    );
  }
}

function* logoutSaga() {
  try {
    destroyCookie('token');
    destroyLocalStorageItem('token');
    yield put(logOut());
    setTimeout(() => {
      window.location.reload();
    }, 400);
  } catch (error) {
    loginReject({
      loginMessage: 'Something went wrong please try again',
      loginStatus: false,
    });
  }
}

export default function* LoginSaga() {
  yield all([
    takeLatest(login.toString(), loginSaga),
    takeLatest(logOut.toString(), logoutSaga),
  ]);
}
