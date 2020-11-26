import React, { useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { Button } from '@atoms';
import { ConfirmationDialog } from '@organisms';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    operationButton: {
      marginRight: theme.spacing(2),
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1),
    },
  })
);

interface BillOperationButtonProps {
  operation: string;
  subTopic?: string;
  disabled: boolean;
  handleExecute: () => void;
}

export const BillOperationButton = ({
  operation,
  subTopic,
  disabled,
  handleExecute
}: BillOperationButtonProps): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  }

  const handelClose = () => {
    setOpen(false);
  }

  const onExecute = () => {
    handleExecute();
    setOpen(false);
  }

  return (
    <>
      <Button
        color={operation === "退店" ? "secondary" : "primary"}
        variant={operation === "退店" ? "contained" : "outlined"}
        onClick={handleOpen}
        disabled={disabled}
        className={classes.operationButton}
      >
        {operation}
      </Button>
      <ConfirmationDialog
        open={open}
        onCancel={handelClose}
        onExecute={onExecute}
        topic={operation}
        subTopic={subTopic}
      />
    </>
  )
}
