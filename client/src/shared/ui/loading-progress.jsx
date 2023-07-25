import { Backdrop, CircularProgress } from '@mui/material';

export const LoadingProgress = () => {
  return (
    <Backdrop
      sx={{
        color: 'text.secondary',
        backgroundColor: 'inherit',
        position: 'inherit',
        width: '100%',
        height: 'calc(100vh - 3.75rem)',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
