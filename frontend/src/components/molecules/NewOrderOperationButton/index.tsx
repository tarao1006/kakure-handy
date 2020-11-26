import React from 'react';
import { Button }from '@atoms';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
  }),
);

interface NewOrderOperationButtonProps {
  operation: string;
  disabled?: boolean;
  handleClick: () => void;
  variant: "text" | "outlined" | "contained";
}

export const NewOrderOperationButton = ({
  operation,
  disabled = false,
  handleClick,
  variant
}: NewOrderOperationButtonProps) => {
  const classes = useStyles();

  return (
    <Button
      color="primary"
      onClick={handleClick}
      className={classes.button}
      disabled={disabled}
      variant={variant}
    >
      {operation}
    </Button>
  )
}
