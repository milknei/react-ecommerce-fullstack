import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import { Box, Container } from '@mui/material';
import { Logout } from '@features/index';
import { Orders } from './orders';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsIcon from '@mui/icons-material/Settings';
import { WishList } from '@widgets/wish-list/index';
import { Outlet, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const StyledTabs = styled((props) => (
  <Tabs {...props} TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }} />
))(({ theme }) => ({
  height: '100%',
  '& .MuiTabs-flexContainer': {
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'center',
    },
  },
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    width: 90,
    backgroundColor: theme.palette.text.primary,
  },
}));

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
  minHeight: '1.5rem !important',
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: '1rem',
  color: theme.palette.text.secondary,
  '&.Mui-selected': {
    color: theme.palette.text.primary,
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(100, 95, 228, 0.32)',
  },
}));

export const User = () => {
  const [value, setValue] = useState('orders');
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
    if (location.pathname === '/user') setValue('orders');
    if (location.pathname === '/user/orders') setValue('orders');
    if (location.pathname === '/user/wishlist') setValue('wishList');
    if (location.pathname === '/user/settings') setValue('settings');
  }, [location]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="xl">
      <TabContext value={value}>
        <StyledTabs value={value} onChange={handleChange} variant="scrollable">
          <StyledTab
            icon={<ReceiptLongIcon />}
            iconPosition="start"
            label="Orders"
            value="orders"
            onClick={() => navigate('orders')}
          />
          <StyledTab
            icon={<FavoriteIcon />}
            iconPosition="start"
            label="Wish List"
            value="wishList"
            onClick={() => navigate('wishlist')}
          />
          <StyledTab
            icon={<SettingsIcon />}
            iconPosition="start"
            label="Settings"
            value="settings"
            onClick={() => navigate('settings')}
          />
        </StyledTabs>
        <Box sx={{ p: 0.05 }} />
        <Outlet />
      </TabContext>
    </Container>
  );
};

export const UserOrdersTab = () => {
  return (
    <TabPanel value="orders" sx={{ p: 0, pt: 3 }}>
      <Orders />
    </TabPanel>
  );
};

export const UserWishListTab = () => {
  return (
    <TabPanel value="wishList" sx={{ p: 0, pt: 3 }}>
      <WishList />
    </TabPanel>
  );
};

export const UserSettingsTab = () => {
  return (
    <TabPanel value="settings" sx={{ p: 0, pt: 3 }}>
      <Logout />
    </TabPanel>
  );
};
