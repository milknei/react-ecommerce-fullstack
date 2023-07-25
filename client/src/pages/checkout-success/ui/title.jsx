import { Typography, Box } from '@mui/material';
import { ButtonMain } from '@shared/index';

export const Title = ({ isLoading, isSuccess }) => {
  if (isLoading)
    return (
      <Typography variant="h3" color="warning.main" sx={{ textAlign: 'center', mt: 5, fontWeight: '600' }}>
        CONFIRMING YOUR PAYMENT...
      </Typography>
    );
  else if (isSuccess)
    return (
      <Typography variant="h3" color="success.main" sx={{ textAlign: 'center', mt: 5, fontWeight: '600' }}>
        YOUR PAYMENT WAS SUCCESSFUL
      </Typography>
    );
  else
    return (
      <Box
        sx={{
          minHeight: 'calc(100svh - 3.75rem)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          py: 5,
        }}
      >
        <Box>
          <Typography variant="h3" color="error.main" sx={{ textAlign: 'center', fontWeight: '600' }}>
            OOPS.. SOMETHING WENT WRONG
          </Typography>
          <Typography variant="body2" sx={{ textAlign: 'center', fontWeight: '600', mt: 5 }}>
            Check your email if you've just completed the payment
          </Typography>
        </Box>
        <ButtonMain text="GO TO MAIN PAGE" onClick={() => navigate('/')} sx={{ my: 0, py: 1.5, px: 3 }} />
      </Box>
    );
};
