import { useState } from 'react';
import { Box, useTheme, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { StyledIconButton, FlexBox, ButtonMain, useMousePosition } from '@shared/index';
import { ToggleThemeColor } from '@features/index';
import { PersonOutline, ShoppingBagOutlined } from '@mui/icons-material';
import { setIsCartOpen } from '@entities/cart/index';
import { setLoggedOut } from '@entities/user/index';
import { clearLocalWishList } from '@entities/wishlist/index';

import ListHeader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsIcon from '@mui/icons-material/Settings';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';

export const NavbarModal = ({ closeModal, isModalOpened, isLoggedIn, username }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { x, y } = useMousePosition();

  const [userOpen, setUserOpen] = useState(true);

  const handleUserClick = () => {
    setUserOpen(!userOpen);
  };

  if (isModalOpened)
    return (
      <Modal open={isModalOpened}>
        <Box sx={{ width: '100%', height: '100%', cursor: 'none' }} onClick={closeModal}>
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
              <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <FlexBox sx={{ marginBottom: '1rem', padding: '0 1rem' }}>
                  <ToggleThemeColor />
                  <StyledIconButton onClick={closeModal}>
                    <CloseIcon size="large" sx={{ color: 'text.primary' }} />
                  </StyledIconButton>
                </FlexBox>
                <Box sx={{ overflowY: 'scroll', flex: '1 1 auto', overflow: 'hidden' }}>
                  <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', mx: 2.5 }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                      <ListHeader component="div" id="nested-list-subheader">
                        {isLoggedIn ? `Hi, ${username}!` : 'Find what you need:'}
                      </ListHeader>
                    }
                  >
                    <ListItemButton
                      onClick={() => {
                        if (isLoggedIn) navigate('/user/wishlist');
                        else navigate('/wishlist');
                        closeModal();
                      }}
                    >
                      <ListItemIcon>
                        <FavoriteIcon />
                      </ListItemIcon>
                      <ListItemText primary="Wish List" />
                    </ListItemButton>
                    <ListItemButton
                      onClick={() => {
                        dispatch(setIsCartOpen({}));
                        closeModal();
                      }}
                    >
                      <ListItemIcon>
                        <ShoppingBagOutlined />
                      </ListItemIcon>
                      <ListItemText primary="Cart" />
                    </ListItemButton>
                    <ListItemButton onClick={handleUserClick}>
                      <ListItemIcon>
                        <PersonOutline />
                      </ListItemIcon>
                      <ListItemText primary="User" />
                      {userOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    {isLoggedIn ? (
                      <Collapse in={userOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          <ListItemButton
                            sx={{ pl: 4 }}
                            onClick={() => {
                              navigate('/user/orders');
                              closeModal();
                            }}
                          >
                            <ListItemIcon>
                              <ReceiptLongIcon />
                            </ListItemIcon>
                            <ListItemText primary="Orders" />
                          </ListItemButton>
                          <ListItemButton
                            sx={{ pl: 4 }}
                            onClick={() => {
                              navigate('/user/settings');
                              closeModal();
                            }}
                          >
                            <ListItemIcon>
                              <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Settings" />
                          </ListItemButton>
                          <ListItemButton
                            sx={{ pl: 4 }}
                            onClick={() => {
                              dispatch(setLoggedOut({}));
                              dispatch(clearLocalWishList());
                              navigate('/');
                              closeModal();
                            }}
                          >
                            <ListItemIcon>
                              <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                          </ListItemButton>
                        </List>
                      </Collapse>
                    ) : (
                      <Collapse in={userOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          <ListItemButton
                            sx={{ pl: 4 }}
                            onClick={() => {
                              navigate('/login');
                              closeModal();
                            }}
                          >
                            <ListItemIcon>
                              <LoginIcon />
                            </ListItemIcon>
                            <ListItemText primary="Login" />
                          </ListItemButton>
                          <ListItemButton
                            sx={{ pl: 4 }}
                            onClick={() => {
                              navigate('/registration');
                              closeModal();
                            }}
                          >
                            <ListItemIcon>
                              <PersonAddIcon />
                            </ListItemIcon>
                            <ListItemText primary="Registration" />
                          </ListItemButton>
                        </List>
                      </Collapse>
                    )}
                  </List>
                </Box>
                <Box sx={{ margin: 0, padding: '0 1rem' }}>
                  <ButtonMain
                    text="BROWSE GAMES"
                    onClick={() => {
                      navigate('/games');
                      closeModal();
                    }}
                    sx={{ my: 0 }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    );
};
