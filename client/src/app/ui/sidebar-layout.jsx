import { React } from 'react';
import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@widgets/sidebar/index';

export const SidebarLayout = () => {
  return (
    <Container maxWidth="xxl" sx={{ display: 'flex'}}>
      <Sidebar />
      <Outlet />
    </Container>
  );
};
