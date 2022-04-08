import React from 'react';

import { LogIn } from '../../../pages/client/auth/logIn/LogIn';
import { PasswordRecover } from '../../../pages/client/auth/passwordRecover/PasswordRecover';
import { SignUp } from '../../../pages/client/auth/signUp/SignUp';
import { Home } from '../../../pages/client/common/Home';
import { routerPath } from '../../constants/routerPath';
import { RouteAttributes } from '../interface/route';

export const RenderRoute: RouteAttributes[] = [
  {
    authorized: false,
    element: <Home />,
    path: routerPath.common.HOME,
  },
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
