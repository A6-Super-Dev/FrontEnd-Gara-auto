import React from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';

interface SnackbarProps {
  snackbarColor?: AlertColor;
  res: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CustomSnackbar = ({ snackbarColor, res, open, setOpen }: SnackbarProps) => {
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={snackbarColor} sx={{ width: '100%' }}>
          {res}
        </Alert>
      </Snackbar>
    </>
  );
};
