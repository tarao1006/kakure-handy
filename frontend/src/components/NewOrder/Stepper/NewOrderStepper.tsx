import * as React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Button,
  Container,
  Step,
  StepLabel,
  Stepper,
} from '@material-ui/core';
import useItems from '../../../hooks/useItems';
import useTables from '../../../hooks/useTables';
import { SelectItem } from './SelectItem';
import { SelectTable } from './SelectTable';
import { Confirmation } from './Confirmation';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonWrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    button: {
      margin: theme.spacing(1),
    },
  }),
);

interface StepperProps {
  handleOrder: () => void;
  activeCategory: number;
  activeStep: number;
  setActiveCategory: (categoryId: number) => void;
  setActiveStep: (step: any) => void;
}

const NewOrderStepper: React.FC<StepperProps> = ({
  handleOrder,
  activeCategory,
  activeStep,
  setActiveCategory,
  setActiveStep,
}) => {
  const classes = useStyles();
  const { targetItems } = useItems();
  const { targetTable } = useTables();

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <SelectTable />
      case 1:
        return <SelectItem activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      case 2:
        return <Confirmation table={targetTable} />
      default:
        return <></>
    }
  };

  const getDisabled = (step: number): boolean => {
    switch (step) {
      case 0:
        return targetTable === undefined
      case 1:
        return targetItems.length === 0
      case 2:
        return false
      default:
        return false
    }
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Stepper activeStep={activeStep} style={{ background: 'transparent' }}>
        <Step>
          <StepLabel>
            テーブル
          </StepLabel>
        </Step>
        <Step>
          <StepLabel>
            注文
          </StepLabel>
        </Step>
        <Step>
          <StepLabel>
            確定
          </StepLabel>
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
    </Container>
  );
}

export default NewOrderStepper;
