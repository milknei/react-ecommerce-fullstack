import { Box, Container, Divider, Typography, useTheme, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { StyledIconButton, FlexBox, ButtonMain, useMousePosition } from '@shared/index';
import { decreaseQuantity, increaseQuantity, removeFromCart, setIsCartOpen } from '@entities/cart/index';

export const CartMenu = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);

  const { x, y } = useMousePosition();

  if (isCartOpen)
    return (
      <Modal open={isCartOpen}>
        <Box sx={{ width: '100%', height: '100%', cursor: 'none' }} onClick={() => dispatch(setIsCartOpen({}))}>
          <Box
            sx={{
              width: '3rem',
              height: '3rem',
              position: 'fixed',
              top: y,
              left: x,
              fontSize: '3rem',
              borderRadius: '50%',
              zIndex: 9000,
            }}
          >
            <CancelRoundedIcon
              sx={{
                position: 'relative',
                top: '-1.9rem',
                left: '-1.5rem',
                backgroundColor: 'background.paper',
                boxShadow: `0 0 1rem ${theme.palette.background.paper}`,
                fontSize: '3rem',
                borderRadius: '50%',
              }}
            />
          </Box>
          <Box
            sx={{
              width: { xs: '100%', sm: '25rem' },
              height: '100%',
              backgroundColor: 'background.paper',
              position: 'fixed',
              right: '0',
              bottom: '0',
              zIndex: 10000,
              cursor: 'auto',
            }}
            dir={theme.direction}
            onClick={(e) => e.stopPropagation()}
          >
            <Box sx={{ padding: '1rem 0', overflow: 'hidden', height: '100%' }}>
              {cart.length === 0 ? (
                <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <FlexBox sx={{ marginBottom: '1rem', padding: '0 1rem' }}>
                    <Typography variant="h3">SHOPPING BAG: ({cart.length})</Typography>
                    <StyledIconButton onClick={() => dispatch(setIsCartOpen({}))}>
                      <CloseIcon sx={{ color: 'text.primary' }} />
                    </StyledIconButton>
                  </FlexBox>
                  <Typography variant="h5" sx={{ textAlign: 'center', textTransform: 'uppercase' }}>
                    Cart is empty
                  </Typography>
                  <Box sx={{ my: 0, mx: '1rem' }}>
                    <ButtonMain
                      text="BROWSE GAMES"
                      onClick={() => {
                        navigate('/games'), dispatch(setIsCartOpen({}));
                      }}
                      sx={{ boxSizing: 'border-box !important', my: 0 }}
                    />
                  </Box>
                </Box>
              ) : (
                <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <FlexBox sx={{ marginBottom: '1rem', padding: '0 1rem' }}>
                    <Typography variant="h3">SHOPPING BAG: ({cart.length})</Typography>
                    <StyledIconButton onClick={() => dispatch(setIsCartOpen({}))}>
                      <CloseIcon sx={{ color: 'text.primary' }} />
                    </StyledIconButton>
                  </FlexBox>
                  <Box sx={{ overflowY: 'scroll', flex: '1 1 auto' }}>
                    {cart.map((item) => (
                      <Box key={`${item.name}-${item.id}`}>
                        <Box sx={{ position: 'relative', padding: '0 1rem', my: 1 }}>
                          <Box
                            sx={{
                              width: '100%',
                              height: '100%',
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              background: ` center / cover no-repeat url(${item.screenshot})`,
                              opacity: 0.1,
                              zIndex: 1
                            }}
                          ></Box>
                          <FlexBox sx={{ padding: '15px 0', zIndex: 2, position: 'relative' }}>
                            <Box sx={{ flex: '1 1 60%' }}>
                              <FlexBox sx={{ marginBottom: '0.3125rem' }}>
                                <Typography
                                  variant="body1"
                                  sx={{ fontWeight: 'bold', cursor: 'pointer' }}
                                  onClick={() => navigate(`games/${item.slug}`)}
                                >
                                  {item.name}
                                </Typography>
                                <StyledIconButton onClick={() => dispatch(removeFromCart({ id: item.id }))}>
                                  <CloseIcon sx={{ color: 'text.primary' }} />
                                </StyledIconButton>
                              </FlexBox>
                              <Typography>Platform: {item.platform}</Typography>
                              <FlexBox sx={{ marginTop: '2rem' }}>
                                <Box
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    border: `0.0938rem solid ${theme.palette.text.secondary}`,
                                  }}
                                >
                                  <StyledIconButton onClick={() => dispatch(decreaseQuantity({ id: item.id }))}>
                                    <RemoveIcon sx={{ color: 'text.primary' }} />
                                  </StyledIconButton>
                                  <Typography>{item.quantity}</Typography>
                                  <StyledIconButton onClick={() => dispatch(increaseQuantity({ id: item.id }))}>
                                    <AddIcon sx={{ color: 'text.primary' }} />
                                  </StyledIconButton>
                                </Box>
                                <Typography sx={{ fontWeight: 'bold' }}>
                                  $ {Math.round(item.price * item.quantity * 10) / 10}
                                </Typography>
                              </FlexBox>
                            </Box>
                          </FlexBox>
                        </Box>
                        <Divider variant="middle" />
                      </Box>
                    ))}
                  </Box>
                  <Box sx={{ margin: 0, padding: '0 1rem' }}>
                    <FlexBox sx={{ margin: '1.25rem 0' }}>
                      <Typography sx={{ fontWeight: 'bold' }}>SUBTOTAL</Typography>
                      <Typography sx={{ fontWeight: 'bold' }}>${totalPrice}</Typography>
                    </FlexBox>
                    <ButtonMain
                      text="CHECKOUT"
                      onClick={() => {
                        navigate('/checkout');
                        dispatch(setIsCartOpen({}));
                      }}
                      sx={{ my: 0 }}
                    />
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Modal>
    );
};
