import { atom, useAtom } from 'jotai';

import { localStg } from '@/utils/storage';

import { globalStore } from '../jotai/store';

import { getToken } from './shared';

const initToken = getToken();

const authAtom = atom(initToken);

export const useAuth = () => {
  const [auth, setAuth] = useAtom(authAtom);

  const isLoggedIn = Boolean(auth);

  function setInfo(data: Api.Auth.LoginToken) {
    setAuth(data.token);
    localStg.set('token', data.token);
    localStg.set('refreshToken', data.refreshToken);
  }

  return {
    token: auth,
    isLoggedIn,
    setAuth: setInfo
  };
};

export const setAuth = (data: Api.Auth.LoginToken) => {
  globalStore.set(authAtom, data.token);

  localStg.set('token', data.token);
  localStg.set('refreshToken', data.refreshToken);
};
