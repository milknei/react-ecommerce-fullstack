import { IconButton } from '@mui/material';

export const StyledIconButton = ({ children, onClick }) => {
  return (
    <IconButton sx={{ color: 'black' }} size="large" onClick={onClick}>
      {children}
    </IconButton>
  );
};
