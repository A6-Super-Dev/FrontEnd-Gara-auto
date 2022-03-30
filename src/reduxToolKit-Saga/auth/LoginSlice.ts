import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoginParams {
  email: string;
  [key: string]: string;
}

export interface LoginReturn {
  loginStatus?: number;
  loginMessage: string;
}

export interface LoginSuccessReturn extends LoginReturn {
  refreshToken: string;
  accessToken: string;
}

export interface LoginRejectReturn extends LoginReturn {}

export interface LoginInitialState extends LoginSuccessReturn {
  isLoggedIn: boolean;
  isLoggingIn: boolean;
}

const initialState: LoginInitialState = {
  isLoggedIn: false,
  isLoggingIn: false,
  accessToken: '',
  loginMessage: '',
  refreshToken: '',
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state: LoginInitialState, action: PayloadAction<LoginParams>) => {
      state.isLoggingIn = true;
    },
    loginSuccess: (state: LoginInitialState, action: PayloadAction<LoginSuccessReturn>) => {
      state.isLoggedIn = true;
      state.isLoggingIn = false;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.loginMessage = action.payload.loginMessage;
      state.loginStatus = action.payload.loginStatus;
    },
    loginReject: (state: LoginInitialState, action: PayloadAction<LoginRejectReturn>) => {
      state.isLoggedIn = false;
      state.isLoggingIn = false;
      state.loginStatus = action.payload.loginStatus;
      state.loginMessage = action.payload.loginMessage;
    },
    logOut: (state: LoginInitialState) => {
      state.isLoggedIn = false;
      state.isLoggingIn = false;
      state.accessToken = '';
      state.loginMessage = '';
      state.loginStatus = undefined;
      state.refreshToken = '';
    },
    reset: (state: LoginInitialState) => {
      state.isLoggingIn = false;
      state.loginMessage = '';
    },
    reAssignToken: (
      state: LoginInitialState,
      action: PayloadAction<{
        newAccessToken: string;
        newRefreshToken: string;
      }>,
    ) => {
      state.accessToken = action.payload.newAccessToken;
      state.refreshToken = action.payload.newRefreshToken;
    },
  },
});

export const { login, logOut, loginReject, loginSuccess, reset, reAssignToken } = loginSlice.actions;

export default loginSlice.reducer;
