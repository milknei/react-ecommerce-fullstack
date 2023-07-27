import { useDispatch, useSelector } from 'react-redux';
import { Badge, Box, Container, Button, Typography, useTheme, useMediaQuery } from '@mui/material';
import { PersonOutline, ShoppingBagOutlined, MenuOutlined, SearchOutlined } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { setIsCartOpen } from '@entities/cart/index';
import { setLinkBeforeLogin } from '@entities/user/index';
import { StyledIconButton } from '@shared/index';
import { ToggleThemeColor, SearchNavbar } from '@features/index';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import styles from './navbar.module.css';
import { useState } from 'react';
import { NavbarModal } from './navbar-modal';

export const Navbar = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const cart = useSelector((state) => state.cart.cart);
  const wishList = useSelector((state) => state.wishList.wishList);
  const user = useSelector((state) => state.user);
  const theme = useTheme();

  const closeModal = () => setIsModalOpened(false);

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? 'rgba(256, 256, 256, 0.98)' : 'rgba(0, 0, 0, 0.95)',
        color: 'tex.primary',
        position: 'fixed',
        top: '0',
        left: '0',
        zIndex: '1000',
      }}
    >
      <NavbarModal
        closeModal={closeModal}
        isModalOpened={isModalOpened}
        isLoggedIn={user.isLoggedIn}
        username={user.username}
      />
      <Container
        maxWidth="xxl"
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          height: '3.75rem',
          mx: 'auto',
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            gap: 2,
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '0',
          }}
        >
          <Box onClick={() => navigate('/')} sx={{ '&:hover': { cursor: 'pointer' } }}>
            <Typography variant="h5" sx={{ display: { xs: 'none', sm: 'block' } }}>
              GAME STASH
            </Typography>
            <Typography variant="h5" sx={{ display: { xs: 'block', sm: 'none' } }}>
              GS
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexGrow: { xs: 1, sm: 0 }, justifyContent: 'space-between', gap: 1 }}>
            <SearchNavbar />
            <Box
              sx={{
                display: { md: 'flex', xs: 'none' },
                justifyContent: 'space-between',
                columnGap: '1.25rem',
                zIndex: '2',
              }}
            >
              <Badge
                badgeContent={wishList.length}
                sx={{
                  color: 'text.secondary',
                  '& .MuiBadge-badge': {
                    backgroundColor: 'neutral.light',
                    right: 10,
                    top: 10,
                    padding: '0 0.25rem',
                    height: '1rem',
                    minWidth: '1rem',
                    fontSize: '0.75rem',
                  },
                }}
                invisible={wishList.length === 0}
              >
                <StyledIconButton
                  onClick={() => {
                    if (user.isLoggedIn) navigate('/user/wishlist');
                    else navigate('/wishlist');
                  }}
                >
                  <FavoriteBorderIcon sx={{ color: 'text.primary' }} className={styles.icon} />
                </StyledIconButton>
              </Badge>
              <Button
                variant="text"
                color="secondary"
                size="large"
                sx={{ color: 'text.primary' }}
                endIcon={<PersonOutline />}
                onClick={() => {
                  dispatch(setLinkBeforeLogin(location.pathname));
                  if (user.isLoggedIn) navigate('/user');
                  else navigate('/login');
                }}
              >
                <Typography
                  sx={{ position: 'relative', top: '0.0625rem', textDecoration: !user.isLoggedIn ? 'underline' : '' }}
                >
                  {user.username || 'Login'}
                </Typography>
              </Button>
              <Badge
                badgeContent={cart.length}
                sx={{
                  color: 'text.secondary',
                  '& .MuiBadge-badge': {
                    backgroundColor: 'neutral.light',
                    right: 10,
                    top: 10,
                    padding: '0 0.25rem',
                    height: '1rem',
                    minWidth: '1rem',
                    fontSize: '0.75rem',
                  },
                }}
                invisible={cart.length === 0}
              >
                <StyledIconButton sx={{ color: 'text.primary' }} onClick={() => dispatch(setIsCartOpen({}))}>
                  <ShoppingBagOutlined sx={{ color: 'text.primary' }} className={styles.icon} />
                </StyledIconButton>
              </Badge>
              <ToggleThemeColor />
            </Box>
            <Box
              sx={{
                display: { md: 'none', xs: 'block' },
              }}
            >
              <StyledIconButton sx={{ color: 'text.primary' }} onClick={() => setIsModalOpened(true)}>
                <MenuOutlined sx={{ color: 'text.primary' }} className={styles.icon} />
              </StyledIconButton>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
