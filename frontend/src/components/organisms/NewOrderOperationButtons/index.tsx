import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { NewOrderOperationButton } from '@molecules';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonWrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
  }),
);

interface NewOrderOperationButtonsProps {
  activeStep: number;
  getDisabled: (step: number) => boolean;
  handleBack: () => void;
  handleNext: () => void;
  handleOrder: () => void;
}

export const NewOrderOperationButtons = ({
  activeStep,
  getDisabled,
  handleBack,
  handleNext,
  handleOrder
}: NewOrderOperationButtonsProps) => {
  const classes = useStyles();

  return (
    <div className={classes.buttonWrapper}>
      <NewOrderOperationButton
        operation="戻る"
        disabled={activeStep === 0}
        handleClick={handleBack}
        variant="text"
      />
      {activeStep === 2
      ? (
        <NewOrderOperationButton
          operation="注文"
          handleClick={handleOrder}
          variant="contained"
        />
      )
      : (
        <NewOrderOperationButton
          operation="次へ"
          handleClick={handleNext}
          variant="contained"
          disabled={getDisabled(activeStep)}
        />
      )}
    </div>
  )
}