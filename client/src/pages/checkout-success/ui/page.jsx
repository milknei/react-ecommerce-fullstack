import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Container, Typography, Box, Backdrop, CircularProgress } from '@mui/material';
import { Title } from './title';
import { FlexBox, ButtonMain } from '@shared/index';
import { Order } from '@entities/order/index';
import { emptyCart } from '@entities/cart/index';

export const CheckoutSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isSuccess = !!order;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getOrder = async () => {
      const sessionId = Object.fromEntries([...searchParams]).session_id;
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/orders/?filters[stripeSessionId][$eq]=${sessionId}`,
          {
            method: 'GET',
          }
        );

        const data = await response.json();
        setOrder(data.data[0].attributes);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    };

    getOrder();
    dispatch(emptyCart());
  }, []);

  return (
    <Container maxWidth="xl" sx={{ height: 'calc(100svh - 60px)' }}>
      <Box
        sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch', mx: 'auto' }}
        maxWidth="sm"
      >
        <Backdrop sx={{ color: '#fff', zIndex: 10000 }} open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Title isLoading={isLoading} isSuccess={isSuccess} />
        {isSuccess && (
          <>
            <Typography variant="h4" color="text.primary" sx={{ textAlign: 'center', my: 4, fontStyle: 'italic' }}>
              Digital keys were sent to your email:{' '}
              <Typography
                variant="h6"
                sx={{ fontWeight: '500', fontStyle: 'normal', ml: 2, wordWrap: 'break-word' }}
                component="span"
              >
                {order.email}
              </Typography>
            </Typography>
            {isSuccess && (
              <Box sx={{ overflowY: 'scroll', flex: '1 1 auto' }}>
                <Order order={order} />
              </Box>
            )}
            <FlexBox sx={{ gap: 3, my: 2 }}>
              <ButtonMain
                text="GO TO MAIN PAGE"
                onClick={() => navigate('/')}
                sx={{ width: { sx: '100%', sm: 'auto' }, flex: '0 1 1', my: 0, py: 1.5, px: 5 }}
              />
              <ButtonMain
                text="VIEW MY ORDERS"
                onClick={() => navigate('/user')}
                sx={{ width: { sx: '100%', sm: 'auto' }, flex: '0 1 1', my: 0, py: 1.5, px: 5 }}
              />
            </FlexBox>
          </>
        )}
      </Box>
    </Container>
  );
};
