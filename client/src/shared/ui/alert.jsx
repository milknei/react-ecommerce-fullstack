import * as React from 'react';




export const Alert = ({ text, type, isOpened = false }) => {
  const [open, setOpen] = React.useState(isOpened);

  const handleClick = () => {
    setOpen(true);
  };

  

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
        {text}
      </Alert>
    </Snackbar>
  );
};
