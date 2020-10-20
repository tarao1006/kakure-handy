import * as React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    buttonWrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    button: {
      margin: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }),
);

interface StepperComponent {
  label: string;
  component: JSX.Element;
  disabled: boolean;
}

interface StepperProps {
  selectTable: StepperComponent,
  selectItem: StepperComponent,
  confirmation: StepperComponent,
  handleOrder: () => void;
  activeStep: number;
  setActiveStep: (step: any) => void;
}

const NewOrderStepper: React.FC<StepperProps> = ({ selectTable, selectItem, confirmation, handleOrder, activeStep, setActiveStep }) => {
  const classes = useStyles();

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return selectTable.component
      case 1:
        return selectItem.component
      case 2:
        return confirmation.component
      default:
        return 'Unknown step'
    }
  }

  const getDisabled = (step: number): boolean => {
    switch (step) {
      case 0:
        return selectTable.disabled
      case 1:
        return selectItem.disabled
      case 2:
        return confirmation.disabled
      default:
        return false
    }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        <Step>
          <StepLabel>{selectTable.label}</StepLabel>
        </Step>
        <Step>
          <StepLabel>{selectItem.label}</StepLabel>
        </Step>
        <Step>
          <StepLabel>{confirmation.label}</StepLabel>
        </Step>
      </Stepper>
      <div>
        {getStepContent(activeStep)}
        <div className={classes.buttonWrapper}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            className={classes.button}
          >
            戻る
          </Button>
          {activeStep === 2
          ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleOrder}
              className={classes.button}
            >
              注文
            </Button>
          )
          : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              className={classes.button}
              disabled={getDisabled(activeStep)}
            >
              次へ
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewOrderStepper;
