import { atom, useAtom } from 'jotai';

import { localStg } from '@/utils/storage';

import { globalStore } from '../jotai/store';

const authAtom = atom({
  token: '',
  refreshToken: ''
});

export const useAuth = () => {
  const [auth, setAuth] = useAtom(authAtom);

  const isLoggedIn = Boolean(auth.token);

  function setInfo(data: Api.Auth.LoginToken) {
    setAuth(data);
    localStg.set('token', data.token);
    localStg.set('refreshToken', data.refreshToken);
  }

  return {
    ...auth,
    isLoggedIn,
    setAuth: setInfo
  };
};

export const setAuth = (data: Api.Auth.LoginToken) => {
  globalStore.set(authAtom, data);

  localStg.set('token', data.token);
  localStg.set('refreshToken', data.refreshToken);
};
