import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="right">
      {'Copyright © '}
      <Link color="inherit" href={import.meta.env.VITE_CLIENT_URL}>
        Game Stash
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export const Footer = () => {
  return (
    <Box sx={{ mt: 'auto', zIndex: 1000 }}>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 5,
          alignSelf: 'flex-end',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light' ? 'rgba(256, 256, 256, 0.95)' : 'rgba(0, 0, 0, 0.95)',
        }}
      >
        <Container maxWidth="xxl">
          <Typography variant="body1" mb={1}>
            Made by Danylo Klymenko using React, Redux, React Rooter DOM, MUI, Stripe, Strapi and Rawg API
          </Typography>
          <Typography variant="body1" color="inherit">
            For more information visit: <Link href="about">About</Link>
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 1,
              my: 2,
              fontSize: { sm: '.8rem', md: '1rem' },
            }}
          >
            <Link href="https://github.com/milknei/" target="_blank" color="inherit">
              GitHub
            </Link>
            <Link href="https://www.linkedin.com/in/danylo-klymenko-185042276/" target="_blank" color="inherit">
              LinkedIn
            </Link>
            <Link href="mailto:danilsmanagement@gmail.com" target="_blank" color="inherit">
              Send an Email
            </Link>
            <Link href="tel:+380996063855" target="_blank" color="inherit">
              +38 (099) 606-38-55
            </Link>
          </Box>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
};
