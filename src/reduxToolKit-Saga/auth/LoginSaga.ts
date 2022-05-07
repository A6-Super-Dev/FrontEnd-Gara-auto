import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as Sentry from '@sentry/react';

import { routerPath } from '../../common/constants/routerPath';
import { destroyCookie, destroyLocalStorageItem, setCookie, setLocalStorageItem } from '../../common/helper/storage';
import { LoginDataReturn } from '../../common/interfaces/Client';
import ClientService from '../../services/clientService';
import { AuthActionType, LoginErrorResponse, LoginParams } from '../types/auth';

import { login, loginReject, loginSuccess, logOut, reset } from './LoginSlice';

function* loginSaga(action: PayloadAction<LoginParams>) {
  try {
    yield put(login(action.payload));
    const res: LoginDataReturn = yield call(() => ClientService.login(action.payload));
    if (res.statusCode === 200) {
      yield put(
        loginSuccess({
          loginMessage: 'Login success, you will be redirected to Home',
          loginStatus: res.statusCode,
        }),
      );

      setCookie('token', String(res.body.authorization));
      setLocalStorageItem('token', String(res.headers.authorization));
      setTimeout(() => {
        window.location.pathname = routerPath.common.HOME;
      }, 400);
      yield put(reset());
    }
  } catch (error: any) {
    const resErr: LoginErrorResponse = error.response;

    if (resErr.status === 500) {
      Sentry.captureException({ reason: 'Error at loginSaga()', exception: resErr }, { level: Sentry.Severity.Fatal });
      Sentry.captureMessage('Error at loginSaga()');
    }

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
      window.location.pathname = routerPath.common.HOME;
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
