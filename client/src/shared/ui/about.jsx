import { Container, Link, Typography } from '@mui/material';
import React from 'react';

export const About = () => {
  return (
    <Container maxWidth="sm" mb={5}>
      <Typography variant="body1">
        This website is made by Danylo Klymenko using React, Redux, React Rooter DOM and MUI
      </Typography>
      <Typography variant="body1" mb={5}>
        Payment system integrated with{' '}
        <Link href="https://stripe.com/" color="inherit" target="_blank">
          Stripe
        </Link>{' '}
      </Typography>
      <Typography variant="body1" mb={5}>
        <Link href="https://rawg.io/" color="inherit" target="_blank">
          rawg.io
        </Link>{' '}
        is used for games API
      </Typography>
      <Typography variant="body1" mb={5}>
        Strapi is used as a headless CMS
      </Typography>
    </Container>
  );
};
