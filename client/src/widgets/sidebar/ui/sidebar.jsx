import { useState } from 'react';
import { SidebarContent } from './sidebar-content';
import { Box, Button, useTheme, Modal } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';

import CloseIcon from '@mui/icons-material/Close';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
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

export const Sidebar = ({ filters, submitHelper }) => {
  const theme = useTheme();
  const [isModalOpened, setIsModalOpened] = useState(false);
  const closeModal = () => setIsModalOpened(false);

  const handleSubmit = (appliedFilters, searchFilter, ordering) => {

    submitHelper(appliedFilters, searchFilter, ordering);
    closeModal();
  };

  return (
    <>
      <Box
        sx={{
          display: { xs: 'block', sm: 'none' },
          position: 'sticky',
          top: '60px',
          zIndex: 90,
          backgroundColor: 'background.paper',
          boxShadow: `0 -5px 0px 5px ${theme.palette.background.paper}`,
        }}
      >
        {!isModalOpened && (
          <Button
            fullWidth
            color="inherit"
            variant="text"
            startIcon={<TuneIcon />}
            onClick={() => setIsModalOpened(true)}
            sx={{pt: 0, pb: 1}}
          >
            Filters
          </Button>
        )}
      </Box>
      <SidebarContent
        filters={filters}
        handleSubmit={handleSubmit}
        isModalOpened={isModalOpened}
        closeModal={closeModal}
      />
    </>
  );
};
