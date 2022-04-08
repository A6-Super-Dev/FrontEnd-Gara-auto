export const routerPath = {
  auth: {
    PASSWORD_RECOVER: '/auth/user/password-recover',
    LOG_IN: '/auth/user/log-in',
    SIGN_UP: '/auth/user/sign-up',
  },
  common: {
    HOME: '/home',
  },
};

export const pathArrayName = (): string[] => {
  const arrayResult: string[] = [];

  for (const [, value] of Object.entries(routerPath)) {
    if (typeof value === 'object') {
      for (const [, secondValue] of Object.entries(value)) {
        arrayResult.push(secondValue);
      }
    } else if (typeof value === 'string') {
      arrayResult.push(value);
    }
  }

  return arrayResult;
};
