import { PasscodeRecover } from '../../../pages/admin/auth/passcodeRecover/PasscodeRecover';
import { SignIn } from '../../../pages/admin/auth/signIn/SignIn';
import { LogIn } from '../../../pages/client/auth/logIn/LogIn';
import { PasswordRecover } from '../../../pages/client/auth/passwordRecover/PasswordRecover';
import { SignUp } from '../../../pages/client/auth/signUp/SignUp';
import { routerPath } from '../../constants/routerPath';
import { Route as Iroute } from '../interface/route';

export const router: Iroute[] = [
  {
    path: routerPath.admin.auth.PASSCODE_RECOVER,
    element: <PasscodeRecover />,
  },
  {
    path: routerPath.admin.auth.SIGN_IN,
    element: <SignIn />,
  },
  {
    path: routerPath.client.auth.LOG_IN,
    element: <LogIn />,
  },
  {
    path: routerPath.client.auth.PASSWORD_RECOVER,
    element: <PasswordRecover />,
  },
  {
    path: routerPath.client.auth.SIGN_UP,
    element: <SignUp />,
  },
];

export const allRouteName = router.map((el) => el.path);
