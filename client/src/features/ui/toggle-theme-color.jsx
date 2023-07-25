import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useDispatch, useSelector } from 'react-redux';
import { setThemeColor } from '@entities/user/index';

export const ToggleThemeColor = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <IconButton
      size="large"
      sx={{ px: 1.7 }}
      onClick={() => dispatch(setThemeColor(user.themeColor === 'light' ? 'dark' : 'light'))}
      color="inherit"
    >
      {user.themeColor === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};
