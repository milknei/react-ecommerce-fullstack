import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { setLoggedOut } from '@entities/user/index';
import { useDispatch, useSelector } from 'react-redux';

export const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  return (
    <Button
      variant="outlined"
      color="error"
      onClick={() => {
        dispatch(setLoggedOut({}));
        navigate(user.linkBeforeLogin);
      }}
    >
      LOG OUT
    </Button>
  );
};
