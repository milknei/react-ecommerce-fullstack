import { useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { theme } from '@shared/index';
import { setThemeColor } from '@entities/user/index';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { setInitialUser, getUserFromLocalCookie } from '@entities/user/index';
import { getWishListByEmail, setWishList } from '@entities/wishList/index';

export const AppProviderHelper = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const getUsername = async () => {
      const user = await getUserFromLocalCookie();
      if (!user) return;

      const fetchedWishList = await getWishListByEmail(user.email);

      dispatch(setInitialUser(user?.username));
      if (fetchedWishList) dispatch(setWishList(fetchedWishList.data[0]));
    };

    getUsername();
  }, []);

  if (!user.themeColor) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    dispatch(setThemeColor(prefersDarkMode ? 'dark' : 'light'));
  }

  Cookies.set('themeColor', user.themeColor, { expires: 365 });
  theme.palette.mode = user.themeColor || 'light';

  const customTheme = createTheme(theme);

  return <ThemeProvider theme={customTheme}>{children}</ThemeProvider>;
};
