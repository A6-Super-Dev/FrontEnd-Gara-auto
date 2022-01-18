import Cookies from 'js-cookie';

interface CookieAttributes {
  expires?: number | Date | undefined;
  path?: string | undefined;
  domain?: string | undefined;
  secure?: boolean | undefined;
  sameSite?: 'strict' | 'Strict' | 'lax' | 'Lax' | 'none' | 'None' | undefined;
  [property: string]: any;
}

export const getLocalStorageItem = (key: string) => {
  return localStorage.getItem(key);
};

export const setLocalStorageItem = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const destroyLocalStorageItem = (key: string) => {
  localStorage.removeItem(key);
};

export const setCookie = (
  name: string,
  value: string,
  option: CookieAttributes
) => {
  Cookies.set(name, value, option);
};

export const getCookie = (name: string) => {
  return Cookies.get(name);
};
