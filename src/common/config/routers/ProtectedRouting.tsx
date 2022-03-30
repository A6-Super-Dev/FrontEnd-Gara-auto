import React, { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { Link, Outlet } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHook';
import { AxiosClientAPI, AxiosClientRequestAccessTokenAPI } from '../../../services/axiosConnection';
import clientAPI from '../../constants/clientAPI';
import { RequestForRefreshTokenErrorResponse, TestErrorResponse } from '../../../reduxToolKit-Saga/types/auth';
import { reAssignToken } from '../../../reduxToolKit-Saga/auth/LoginSlice';
import { setLocalStorageItem } from '../../helper/storage';
import { ModalComponents } from '../../../components/Modal/ModalComponents';
import messages from '../../constants/messages';

interface ClientRequestAccessTokenReturn {
  statusCode: number;
  headers: {
    authorization: string;
  };
}

export const ProtectedRouting: React.FunctionComponent = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(true);
  const [accessPass, setAccessPass] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((globalState) => globalState.login.accessToken);
  const refreshToken = useAppSelector((globalState) => globalState.login.refreshToken);
  const isLoggedIn = useAppSelector((globalState) => globalState.login.isLoggedIn);

  const requestForRefreshToken = async () => {
    try {
      const response: AxiosResponse<ClientRequestAccessTokenReturn> = await AxiosClientRequestAccessTokenAPI.post(
        clientAPI.genNewToken,
      );
      dispatch(reAssignToken({ newAccessToken: response.data.headers.authorization, newRefreshToken: refreshToken }));
      setLocalStorageItem('token', response.data.headers.authorization);
    } catch (error: any) {
      const resErr: RequestForRefreshTokenErrorResponse = error.response;
      const errMessage = resErr.data.message;
      setErrorMessage(errMessage);
      if (resErr.status === 401 && errMessage.includes(messages.RefreshTokenExpiry)) {
        setAuthenticated(false);
        setErrorMessage(messages.LoginExpiry);
      }
    }
  };

  const testAlive = async () => {
    try {
      await AxiosClientAPI.get(clientAPI.checkValid);
    } catch (error: any) {
      const resErr: TestErrorResponse = error.response;
      const errMessage = resErr.data.message;
      setErrorMessage(errMessage);
      if (resErr.status === 401 && errMessage.includes(messages.AccessTokenExpiry)) {
        setAccessPass(false);
      }
    }
  };

  useEffect(() => {
    testAlive();
  }, []);

  useEffect(() => {
    if (!accessPass && isLoggedIn && refreshToken !== '' && authenticated) {
      requestForRefreshToken();
    }
  }, [accessToken, refreshToken, isLoggedIn, accessPass]);

  return authenticated ? (
    <Outlet />
  ) : (
    <ModalComponents isOpen={true} styling={{}}>
      <Link to="/home">{errorMessage}, Click to redirected to Home</Link>
    </ModalComponents>
  );
};
