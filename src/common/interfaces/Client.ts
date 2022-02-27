interface TokenType {
  authorization: string;
}

interface LoginDataReturn {
  statusCode: number;
  headers: TokenType;
  body: TokenType;
}

interface LoginReturn {
  status: number;
  data: LoginDataReturn;
}

export type { LoginReturn, LoginDataReturn };
