import { useState } from 'react';
import { SidebarContent } from './sidebar-content';
import { Box, Button, useTheme, Modal } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';

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
            sx={{ pt: 0, pb: 1 }}
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
