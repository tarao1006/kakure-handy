import React from 'react';
import { IconButton, Snackbar } from '@atoms';
import { CloseIcon } from '@icons';

interface OperationSnackbarProps {
  open: boolean;
  operation: string;
  handleClose: (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => void;
}

export const OperationSnackbar = ({
  open,
  operation,
  handleClose
}: OperationSnackbarProps) => {

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
      message={`${operation} 処理を完了しました。`}
      action={
        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    />
  )
}