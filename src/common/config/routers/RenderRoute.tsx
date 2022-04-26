import React from 'react';

import { LogIn } from '../../../pages/client/auth/logIn/LogIn';
import { PasswordRecover } from '../../../pages/client/auth/passwordRecover/PasswordRecover';
import { SignUp } from '../../../pages/client/auth/signUp/SignUp';
import { Home } from '../../../pages/client/common/Home';
import ErrorPages from '../../../pages/Error/ErrorPages';
import { routerPath } from '../../constants/routerPath';
import { getRefreshToken } from '../../helper/storage';
import { RouteAttributes } from '../interface/route';

export const staticRoute: RouteAttributes[] = [
  {
    authorized: false,
    element: <Home />,
    path: routerPath.common.HOME,
  },
  {
    authorized: false,
    element: <ErrorPages />,
    path: routerPath.common.ERROR,
  },
];

const deletedRoute: RouteAttributes[] = [
  {
    authorized: false,
    element: <LogIn />,
    path: routerPath.auth.LOG_IN,
  },
  {
    authorized: true,
    element: <PasswordRecover />,
    path: routerPath.auth.PASSWORD_RECOVER,
  },
  {
    authorized: false,
    element: <SignUp />,
    path: routerPath.auth.SIGN_UP,
  },
];

const token = getRefreshToken();

export const RenderRoute = (): RouteAttributes[] => {
  if (token) {
    return [...staticRoute];
  }
  return [...staticRoute, ...deletedRoute];
};
