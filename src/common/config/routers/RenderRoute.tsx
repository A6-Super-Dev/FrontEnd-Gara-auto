import React from 'react';

import { LogIn } from '../../../pages/client/auth/logIn/LogIn';
import { NewPassword } from '../../../pages/client/auth/newPassword/NewPassword';
import { PasswordRecover } from '../../../pages/client/auth/passwordRecover/PasswordRecover';
import { SignUp } from '../../../pages/client/auth/signUp/SignUp';
import { SignUpSuccess } from '../../../pages/client/auth/signUpSuccess/SignUpSuccess';
import { Home } from '../../../pages/client/common/Home';
import ErrorPages from '../../../pages/Error/ErrorPages';
import { routerPath } from '../../constants/routerPath';
import { getRefreshToken } from '../../helper/storage';
import { RouteAttributes } from '../interface/route';

const staticRoute: RouteAttributes[] = [
  {
    authorized: false,
    element: <Home />,
    path: routerPath.common.HOME,
    needNavigator: true,
  },
  {
    authorized: false,
    element: <ErrorPages />,
    path: routerPath.common.ERROR,
    needNavigator: false,
  },
];

const deletedRoute: RouteAttributes[] = [
  {
    authorized: false,
    element: <LogIn />,
    path: routerPath.auth.LOG_IN,
    needNavigator: false,
  },
  {
    authorized: false,
    element: <PasswordRecover />,
    path: routerPath.auth.PASSWORD_RECOVER,
    needNavigator: false,
  },
  {
    authorized: true,
    element: <NewPassword />,
    path: routerPath.auth.NEW_PASSWORD,
    needNavigator: false,
  },
  {
    authorized: false,
    element: <SignUp />,
    path: routerPath.auth.SIGN_UP,
    needNavigator: false,
  },
  {
    authorized: false,
    element: <SignUpSuccess />,
    path: routerPath.auth.SIGN_UP_SUCCESS,
    needNavigator: false,
  },
];

const token = getRefreshToken();

export const RenderRoute = (): RouteAttributes[] => {
  if (token) {
    return [...staticRoute];
  }
  return [...staticRoute, ...deletedRoute];
};
