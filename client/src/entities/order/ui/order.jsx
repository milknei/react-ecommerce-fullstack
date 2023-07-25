import React from 'react';
import { FlexBox } from '@shared/index';
import { Typography, Box, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Order = ({ order, sx = {} }) => {
  const navigate = useNavigate();

  return (
    <Box sx={sx}>
      {order.items.map((item) => (
        <Box key={`${item.name}-${item.id}`}>
          <Box sx={{ position: 'relative', my: 1 }}>
            <FlexBox sx={{ marginBottom: '0.3125rem' }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: 'bold', '&:hover': { cursor: 'pointer' } }}
                onClick={() => navigate(`/games/${item.id}`)}
              >
                {item.name}
              </Typography>
            </FlexBox>
            <Typography>
              Platform:{' '}
              <Typography variant="body1" component="span" sx={{ fontWeight: 'bold', ml: 1 }}>
                {item.platform}
              </Typography>
            </Typography>
            <FlexBox sx={{ mt: 1.5, alignItems: 'flex-end !important' }}>
              <Typography>
                Quantity:
                <Typography variant="body1" component="span" sx={{ fontWeight: 'bold', ml: 1 }}>
                  {item.quantity}
                </Typography>
              </Typography>
              <Box>
                <Typography sx={{ textAlign: 'right' }}>Price:</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 0.2 }}>
                  $ {Math.round(item.price * item.quantity * 10) / 10}
                </Typography>
              </Box>
            </FlexBox>
          </Box>
          <Divider variant="middle" />
        </Box>
      ))}
      <Typography variant="body1" sx={{ textAlign: 'end', mt: 2 }}>
        Total Price:
        <Typography component="span" sx={{ fontWeight: 'bold', ml: 2 }}>
          $ {order.totalPrice / 100}
        </Typography>
      </Typography>
    </Box>
  );
};
