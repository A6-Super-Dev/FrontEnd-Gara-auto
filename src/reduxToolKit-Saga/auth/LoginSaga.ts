import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { routerPath } from '../../common/constants/routerPath';
import { destroyCookie, destroyLocalStorageItem, setCookie, setLocalStorageItem } from '../../common/helper/storage';
import { LoginDataReturn } from '../../common/interfaces/Client';
import ClientService from '../../services/clientService';
import TimeHelper from '../../common/helper/time';
import { AuthActionType, ErrorResponse, LoginParams } from '../types/auth';

import { loginReject, loginSuccess, logOut, reset } from './LoginSlice';

function* loginSaga(action: PayloadAction<LoginParams>) {
  try {
    const res: LoginDataReturn = yield call(() => ClientService.login(action.payload));
    if (res.statusCode === 200) {
      yield put(
        loginSuccess({
          accessToken: res.headers.authorization,
          loginMessage: 'Login success, you will be redirected to Home',
          loginStatus: res.statusCode,
          refreshToken: res.body.authorization,
        }),
      );

      const expiredTime = TimeHelper.addTime(new Date(), 'days', 7);
      setCookie('token', String(res.body.authorization), {
        expires: expiredTime,
      });
      setLocalStorageItem('token', String(res.headers.authorization));
      setTimeout(() => {
        window.location.pathname = routerPath.client.common.HOME;
      }, 400);
      yield put(reset());
    }
  } catch (error: any) {
    const resErr: ErrorResponse = error.response;
    yield put(
      loginReject({
        loginMessage: resErr.data.message,
        loginStatus: resErr.status,
      }),
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
    yield put(
      loginReject({
        loginMessage: 'Something went wrong please try again',
        loginStatus: 500,
      }),
    );
  }
}

export default function* LoginSaga() {
  yield all([takeLatest(AuthActionType.LOGIN, loginSaga), takeLatest(AuthActionType.LOGOUT, logoutSaga)]);
}
