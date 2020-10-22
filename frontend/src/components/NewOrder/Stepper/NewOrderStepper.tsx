import * as React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Button,
  Container,
  Step,
  StepLabel,
  Stepper,
} from '@material-ui/core';
import { Item, Table } from '../../../model'
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
  tables: Table[];
  items: Item[];
  targetTable: Table | undefined;
  targetItems: Item[] | undefined;
  handleSetTable: (table: Table) => void;
  handleSetItem: (item: Item) => void;
  handleIncrement: (id: number) => void;
  handleDecrement: (id: number) => void;
  handleOrder: () => void;
  activeStep: number;
  setActiveStep: (step: any) => void;
}

const NewOrderStepper: React.FC<StepperProps> = ({
  tables,
  items,
  targetTable,
  targetItems,
  handleSetTable,
  handleSetItem,
  handleIncrement,
  handleDecrement,
  handleOrder,
  activeStep,
  setActiveStep,
}) => {
  const classes = useStyles();

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <SelectTable tables={tables} handleSet={handleSetTable} defaultValue={targetTable} />
      case 1:
        return <SelectItem items={items} handleSet={handleSetItem} defaultItems={targetItems} />
      case 2:
        return <Confirmation table={targetTable} items={targetItems} increment={handleIncrement} decrement={handleDecrement} />
      default:
        return 'Unknown step'
    }
  };

  const getDisabled = (step: number): boolean => {
    switch (step) {
      case 0:
        return targetTable === undefined
      case 1:
        return targetItems === undefined
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
