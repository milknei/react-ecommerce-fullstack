import React from 'react';
import { Box } from '@mui/material';

export const ParallelogramTag = ({ text }) => {
  return (
    <Box
      sx={{
        width: 'auto',
        fontWeight: 600,
        fontSize: '1rem',
        backgroundColor: 'text.secondary',
        color: 'primary.contrastText',
        transform: 'skew(20deg)',
        borderRadius: '0.3rem',
        padding: '0 0.5rem',
        margin: '1rem auto'
      }}
    >
      <Box
        sx={{
          display: 'inline-block',

          transform: 'skew(-20deg)',
        }}
      >
        {text}
      </Box>
    </Box>
  );
};
