import React from 'react';
import { Button } from '@mui/material';

export const ButtonMain = ({ text, onClick, type = 'button', disabled = false, sx = {} }) => {
  return (
    <Button
      fullWidth
      sx={{
        '&:hover': { color: 'text.primary' },
        backgroundColor: 'text.primary',
        borderRadius: '0.2rem',
        color: 'background.paper',
        fontWeight: 'bold',
        letterSpacing: '0.0625rem',
        fontSize: '.95em',
        padding: '1.0625rem 2.5rem',
        margin: '1.25rem 0',
        ...sx,
      }}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </Button>
  );
};
