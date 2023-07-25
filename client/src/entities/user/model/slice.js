import { createSlice } from '@reduxjs/toolkit';
import { setToken, getUserFromLocalCookie, unsetToken } from '../lib/auth';
import Cookies from 'js-cookie';

const setLoggedInUser = async () => {
  const username = await getUserFromLocalCookie()?.username;
  const themeColor = await Cookies.get('themeColor');
  const initialState = {
    themeColor: themeColor,
    linkBeforeLogin: '/',
    isLoggedIn: !!username,
    username: username || '',
  };
  return initialState;
};
setLoggedInUser();

const initialState = {
  themeColor: Cookies.get('themeColor'),
  linkBeforeLogin: '/',
  isLoggedIn: false,
  username: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setInitialUser: (state, action) => {
      const username = action.payload;

      state.username = username || '';
      state.isLoggedIn = !!username;
    },
    setLoggedIn: (state, action) => {
      state.username = action.payload.user.username;
      state.isLoggedIn = true;
      setToken(action.payload, action.payload.rememberMe);
    },
    setLoggedOut: (state) => {
      state.username = '';
      state.isLoggedIn = false;
      localStorage.setItem('wishList', '[]');
      unsetToken();
    },
    setLinkBeforeLogin: (state, action) => {
      if ('/user/registration/login'.match(action.payload)) return;
      state.linkBeforeLogin = action.payload;
    },
    setThemeColor: (state, action) => {
      state.themeColor = action.payload;
    },
  },
});

export const { setLoggedIn, setLoggedOut, setLinkBeforeLogin, setThemeColor, setInitialUser } = userSlice.actions;

export const userReducer = userSlice;
