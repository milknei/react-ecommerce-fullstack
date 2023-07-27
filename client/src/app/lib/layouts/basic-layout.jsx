import React from 'react';
import { Footer } from '@shared/index';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@widgets/navbar/index';
import { Box } from '@mui/material';

export const BasicLayout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: 'calc(100vh - 60px)',
      }}
    >
      <Navbar />
      <Outlet />
      <Footer />
    </Box>
  );
};
