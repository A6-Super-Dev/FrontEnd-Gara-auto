import React from 'react';

import { useAppDispatch } from '../../../common/hooks/ReduxHook';
import { AuthActionType } from '../../../reduxToolKit-Saga/types/auth';
import { AxiosClientAPI } from '../../../services/axiosConnection';
import './Home.scss';

export const Home = () => {
  const dispatch = useAppDispatch();
  function DispatchLogin() {
    dispatch({
      type: AuthActionType.LOGIN,
      payload: {
        email: 'ducquang03102000@gmail.com',
        password: 'ducquang123',
      },
    });
  }

  function DispatchLogout() {
    dispatch({
      type: AuthActionType.LOGOUT,
      payload: {},
    });
  }

  async function TestAPI() {
    try {
      await AxiosClientAPI.get('/auth/api-check');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <button className="test-button mr-10" onClick={() => DispatchLogin()}>
        <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </svg>
        <span>Download</span>
      </button>

      <button className="test-button" onClick={() => DispatchLogout()}>
        <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </svg>
        <span>Log out</span>
      </button>

      <button className="test-button ml-10" onClick={() => TestAPI()}>
        <svg className="fill-current w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </svg>
        <span>Test API</span>
      </button>
    </div>
  );
};
