import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthenticationStatus } from '../types/auth';

interface LoginParams {
  email: string;
  [key: string]: string;
}

export interface LoginReturn {
  loginMessage: string | null;
}

export interface LoginRejectReturn extends LoginReturn {}

export interface LoginInitialState extends LoginReturn {
  isLoggingIn: boolean;
  status: AuthenticationStatus;
}

const initialState: LoginInitialState = {
  isLoggingIn: false,
  loginMessage: null,
  status: AuthenticationStatus.UnAuthorized,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state: LoginInitialState, _action: PayloadAction<LoginParams>) => {
      state.isLoggingIn = true;
    },
    loginSuccess: (state: LoginInitialState, action: PayloadAction<LoginReturn>) => {
      state.isLoggingIn = false;
      state.loginMessage = action.payload.loginMessage;
      state.status = AuthenticationStatus.Authorized;
    },
    loginReject: (state: LoginInitialState, action: PayloadAction<LoginReturn>) => {
      state.isLoggingIn = false;
      state.loginMessage = action.payload.loginMessage;
      state.status = AuthenticationStatus.UnAuthorized;
    },
    logOut: (state: LoginInitialState) => {
      state.isLoggingIn = false;
      state.loginMessage = '';
      state.status = AuthenticationStatus.UnAuthorized;
    },
    reset: (state: LoginInitialState) => {
      state.isLoggingIn = false;
      state.loginMessage = '';
    },
  },
});

export const { login, logOut, loginReject, loginSuccess, reset } = loginSlice.actions;

export default loginSlice.reducer;
